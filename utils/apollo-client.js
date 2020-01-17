import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';
import auth0 from './auth0';

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URI = process.env.GRAPHQL_URI;

const getTokenFromLocalCookie = async () => {
	const res = await fetch('/api/token');
	const { accessToken } = await res.json();
	return accessToken;
};

const getTokenFromServerCookie = async (req, res) => {
	const tokenCache = await auth0.tokenCache(req, res);
	const { accessToken } = await tokenCache.getAccessToken();
	return accessToken;
};

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
	({ ctx, initialState }) => {
		return new ApolloClient({
			fetch,
			uri: GRAPHQL_URI,
			cache: new InMemoryCache().restore(initialState || {}),
			request: async (operation) => {
				const token = process.browser
					? await getTokenFromLocalCookie()
					: await getTokenFromServerCookie(ctx.req, ctx.res);
				operation.setContext({
					headers: {
						bearer: token ? `${token}` : '',
					},
				});
			},
		});
	},
	{ getDataFromTree: 'never' },
);
