import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import plaid from 'plaid';
import { initApolloClient } from '../../utils/apollo-client';
import ITEMS_QUERY from '../../graphql/machine/items.query';
import TRANSACTIONS_MUTATION from '../../graphql/machine/transactions.mutation';
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
			audience: 'https://expensebin.now.sh/api/',
			client_id: process.env.AUTH0_CLIENT_ID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
		}),
		headers: { 'Content-Type': 'application/json' },
	});
	const json = await auth0Res.json();
	auth0Token = json.access_token;
	return auth0Token;
}

// opts = { itemId:itemId, transactionCount:transactionCount, historical:bool }
async function updateTransactions(opts) {
	const { itemId, transactionCount, historical } = opts;
	// check if item exists and last time we pulled it
	apolloClient.query({ query: ITEMS_QUERY, variables: { itemId: itemId } }).then((res) => {
		const {
			error,
			data: { items },
		} = res;
		if (error) throw error;
		if (items && items.length > 0) {
			// if so, poll plaid for new stuff
			items.forEach((item) => {
				const timeAgo = historical
					? moment()
							.utc()
							.subtract(3, 'years')
							.format('YYYY-MM-DD')
					: moment(item.date_last_checked)
							.utc()
							.substract(1, 'day')
							.format('YYYY-MM-DD');
				plaidClient.getAllTransactions(
					item.access_token,
					timeAgo,
					today,
					{ count: transactionCount },
					(transactionErr, transactionRes) => {
						// then, upsert new stuff and add transactions
						apolloClient
							.mutate({
								mutation: TRANSACTIONS_MUTATION,
								variables: { transactionsInput: transactionRes.transactions },
							})
							.then((transactionsRes) => {
								if (transactionsRes.error) {
									throw transactionsRes.error;
								}
								apolloClient.mutate({
									mutation: ITEM_DATE_UPDATE,
									variables: {
										itemId: item.item_id,
										dateLastChecked: moment()
											.utc()
											.format(),
									},
								});
							});
					},
				);
			});
		}
	});
}

export default async function plaidWebhook(req, res) {
	try {
		const token = await getAuth0Token();
		apolloClient = initApolloClient({ req, res }, {}, token);
		plaidClient = new plaid.Client(
			process.env.PLAID_CLIENT_ID,
			process.env.PLAID_SECRET,
			process.env.PLAID_PUBLIC_KEY,
			plaid.environments.sandbox,
		);
		const webhook = req.body;
		switch (webhook.webhook_type) {
			case 'TRANSACTIONS':
				switch (webhook.webhook_code) {
					case 'INITIAL_UPDATE':
						updateTransactions({
							itemId: webhook.item_id,
							transactionCount: webhook.new_transactions,
							historical: false,
						});
						break;
					case 'HISTORICAL_UPDATE':
						updateTransactions({
							itemId: webhook.item_id,
							transactionCount: webhook.new_transactions,
							historical: true,
						});
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}

		res.status(200).json('ok');
		//		const apolloClient = initApolloClient({ req, res }, {}, json.access_token);
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
