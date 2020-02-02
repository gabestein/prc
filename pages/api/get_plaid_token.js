import plaid from 'plaid';
import { initApolloClient } from '../../utils/apollo-client';
import ITEMS_MUTATION from '../../graphql/items.mutation';

const plaidClient = new plaid.Client(
	process.env.PLAID_CLIENT_ID,
	process.env.PLAID_SECRET,
	process.env.PLAID_PUBLIC_KEY,
	plaid.environments.sandbox,
);

export default async function getPlaidToken(req, res) {
	try {
		const {
			publicToken,
			// eslint-disable-next-line camelcase
			institution: { name, institution_id },
		} = JSON.parse(req.body);
		plaidClient.exchangePublicToken(publicToken, function(plaidErr, plaidRes) {
			if (plaidErr) throw plaidErr;
			const item = {
				itemId: plaidRes.item_id,
				accessToken: plaidRes.access_token,
				name: name,
				institutionId: institution_id,
			};
			plaidClient.getAccounts(item.accessToken, function(accountErr, accountRes) {
				if (accountErr) throw accountErr;
				const { accounts } = accountRes;
				accounts.forEach((account, key) => {
					accounts[key].item_id = item.itemId;
				});
				const apolloClient = initApolloClient({ req, res }, {});
				apolloClient
					.mutate({
						mutation: ITEMS_MUTATION,
						variables: { ...item, accountsInput: accounts },
					})
					.then((mutationRes) => {
						if (mutationRes.error) throw mutationRes.error;
						console.log(mutationRes);
						res.status(200).send('ok');
					});
			});
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
