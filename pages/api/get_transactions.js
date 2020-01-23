import plaid from 'plaid';
import moment from 'moment';
import { initApolloClient } from '../../utils/apollo-client';
import ITEMS_QUERY from '../../graphql/items.query';
import TRANSACTIONS_MUTATION from '../../graphql/transactions.mutation';

const today = moment().format('YYYY-MM-DD');

const thirtyDaysAgo = moment()
	.subtract(30, 'days')
	.format('YYYY-MM-DD');

const plaidClient = new plaid.Client(
	process.env.PLAID_CLIENT_ID,
	process.env.PLAID_SECRET,
	process.env.PLAID_PUBLIC_KEY,
	plaid.environments.sandbox,
);

export default async function getTransactions(req, res) {
	try {
		const apolloClient = initApolloClient({ req, res }, {});
		apolloClient.query({ query: ITEMS_QUERY }).then(({ data: { items } }) => {
			plaidClient.getTransactions(
				items[0].access_token,
				thirtyDaysAgo,
				today,
				(transactionErr, transactionRes) => {
					apolloClient.mutate({
						mutation: TRANSACTIONS_MUTATION,
						variables: { transactionsInput: transactionRes.transactions },
					});
				},
			);
			res.status(200).json('ok');
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 400).end(error.message);
	}
}
