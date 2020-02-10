import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import plaid from 'plaid';
import { initApolloClient } from '../../utils/apollo-client';
import ITEMS_QUERY from '../../graphql/machine/items.query';
import TRANSACTIONS_MUTATION, {
	TRANSACTIONS_REMOVE_MUTATION,
} from '../../graphql/machine/transactions.mutation';
import ITEM_DATE_UPDATE from '../../graphql/machine/items.mutation';

const today = moment()
	.utc()
	.format('YYYY-MM-DD');
let auth0Token;
let apolloClient;
let plaidClient;

async function getAuth0Token() {
	if (auth0Token) {
		return auth0Token;
	}
	const auth0Res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
		method: 'post',
		body: JSON.stringify({
			grant_type: 'client_credentials',
			audience: `${process.env.API_URI || process.env.BASE_URI}`,
			client_id: process.env.AUTH0_CLIENT_ID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
		}),
		headers: { 'Content-Type': 'application/json' },
	});
	const json = await auth0Res.json();
	auth0Token = json.access_token;
	return auth0Token;
}

// opts = { itemId:itemId, transactions:[transactions], historical:bool }
async function removeTransactions(opts) {
	const { itemId, transactions } = opts;
	try {
		const query = await apolloClient.query({
			query: ITEMS_QUERY,
			variables: { itemId: itemId },
		});
		const {
			error,
			data: { items },
		} = query;
		if (error) throw error;
		if (items && items.length > 0) {
			const remove = await apolloClient.mutate({
				mutation: TRANSACTIONS_REMOVE_MUTATION,
				variables: { transactions: transactions },
			});
			const { removeError } = remove;
			if (removeError) throw removeError;
			return remove;
		}
		return {};
	} catch (error) {
		console.error(error);
		return error;
	}
}

// TODO: refactor this mess
// opts = { itemId:itemId, transactionCount:transactionCount, historical:bool }
async function updateTransactions(opts) {
	const { itemId, transactionCount, historical } = opts;
	// check if item exists and last time we pulled it
	try {
		const query = await apolloClient.query({
			query: ITEMS_QUERY,
			variables: { itemId: itemId },
		});
		const {
			error,
			data: { items },
		} = query;
		if (error) throw error;
		if (items && items.length > 0) {
			const item = items[0];
			const timeAgo = historical
				? moment()
						.utc()
						.subtract(3, 'years')
						.format('YYYY-MM-DD')
				: moment(item.date_last_checked || new Date())
						.utc()
						.subtract(2, 'days')
						.format('YYYY-MM-DD');
			const plaidPromise = await plaidClient
				.getAllTransactions(item.access_token, timeAgo, today, { count: transactionCount })
				.then(async (plaidRes) => {
					const transactions = await apolloClient.mutate({
						mutation: TRANSACTIONS_MUTATION,
						variables: { transactionsInput: plaidRes.transactions },
					});
					if (transactions.error) throw transactions.error;
					const updateItem = await apolloClient.mutate({
						mutation: ITEM_DATE_UPDATE,
						variables: {
							itemId: item.item_id,
							dateLastChecked: moment()
								.utc()
								.format(),
						},
					});
					if (updateItem.error) throw updateItem.error;
					return updateItem;
				});
			return plaidPromise;
		}
		return {};
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
}

export default async function plaidWebhook(req, res) {
	if (!req.query.key || req.query.key !== process.env.PLAID_WEBHOOK_KEY) {
		res.status(403).send('Access denied.');
		return; // not sure why this is actually needed but hey
	}
	try {
		const token = await getAuth0Token();
		apolloClient = initApolloClient({ req, res }, {}, token);
		plaidClient = new plaid.Client(
			process.env.PLAID_CLIENT_ID,
			process.env.PLAID_SECRET,
			process.env.PLAID_PUBLIC_KEY,
			plaid.environments[process.env.PLAID_ENV],
		);
		const webhook = req.body;
		switch (webhook.webhook_type) {
			case 'TRANSACTIONS':
				switch (webhook.webhook_code) {
					case 'INITIAL_UPDATE' || 'DEFAULT_UPDATE':
						await updateTransactions({
							itemId: webhook.item_id,
							transactionCount: webhook.new_transactions,
							historical: false,
						}).catch((updateError) => {
							throw updateError;
						});
						break;
					case 'HISTORICAL_UPDATE':
						await updateTransactions({
							itemId: webhook.item_id,
							transactionCount: webhook.new_transactions,
							historical: true,
						}).catch((updateError) => {
							throw updateError;
						});
						break;
					case 'TRANSACTIONS_REMOVED':
						await removeTransactions({
							itemId: webhook.item_id,
							transactions: webhook.removed_transactions,
						}).catch((updateError) => {
							throw updateError;
						});
						break;
					default:
						console.warn('unhandled webhook', webhook);
						break;
				}
				break;
			default:
				break;
		}
		res.status(200).send('ok');
	} catch (error) {
		console.error(error);
		res.status(error.status || error.status_code || 500).end(error.message);
	}
}
