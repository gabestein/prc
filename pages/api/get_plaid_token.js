import plaid from 'plaid';
import { initApolloClient } from '../../utils/apollo-client';
import ITEMS_MUTATION from '../../graphql/items.mutation';
import ITEMS_QUERY from '../../graphql/items.query';

const plaidClient = new plaid.Client(
	process.env.PLAID_CLIENT_ID,
	process.env.PLAID_SECRET,
	process.env.PLAID_PUBLIC_KEY,
	plaid.environments[process.env.PLAID_ENV],
);

export default async function getPlaidToken(req, res) {
	try {
		const {
			publicToken,
			// eslint-disable-next-line camelcase
			institution: { name, institution_id },
			accounts: newAccounts,
		} = JSON.parse(req.body);
		const apolloClient = initApolloClient({ req, res }, {});

		// painfully check to make sure the user doesn't already have this institution added
		const {
			data: { items },
		} = await apolloClient.query({ query: ITEMS_QUERY });
		const matchedItems = [];
		items.forEach((item) => {
			// eslint-disable-next-line camelcase
			if (item.institution_id === institution_id) matchedItems.push(item);
		});
		if (matchedItems.length > 0) {
			const existingMasks = matchedItems.flatMap((matchedItem) => {
				return matchedItem.item_accounts.map((matchedAccount) => {
					return matchedAccount.mask;
				});
			});
			const newMasks = newAccounts.map((account) => account.mask);
			if (existingMasks.some((existingMask) => newMasks.includes(existingMask))) {
				throw new Error('Account already exists');
			}
		}

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
				apolloClient
					.mutate({
						mutation: ITEMS_MUTATION,
						variables: { ...item, accountsInput: accounts },
					})
					.then((mutationRes) => {
						if (mutationRes.error) throw mutationRes.error;
						res.status(200).send('ok');
					});
			});
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
