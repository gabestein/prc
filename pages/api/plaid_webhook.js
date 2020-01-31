import fetch from 'isomorphic-unfetch';
import { initApolloClient } from '../../utils/apollo-client';
import ITEMS_QUERY from '../../graphql/items.query';

export default async function plaidWebhook(req, res) {
	try {
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
		const apolloClient = initApolloClient({ req, res }, {}, json.access_token);
		apolloClient.query({ query: ITEMS_QUERY }).then(({ data: { items } }) => {
			console.log(items);
			res.status(200).json('ok');
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
