import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';
import auth0 from './auth0';

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URI = process.env.GRAPHQL_URI;

const getTokenFromLocalCookie = async () => {
	try {
		const res = await fetch('/api/token');
		const { accessToken } = await res.json();
		return accessToken;
	} catch (err) {
		return null;
	}
};

const getTokenFromServerCookie = async (req, res) => {
	try {
		const tokenCache = await auth0.tokenCache(req, res);
		const { accessToken } = await tokenCache.getAccessToken();
		return accessToken;
	} catch (err) {
		/* res.writeHead(302, {
			Location: '/api/login',
		});
		res.end(); */
		return null;
	}
};

export const initApolloClient = (ctx, initialState) => {
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
					authorization: token ? `Bearer ${token}` : null,
				},
			});
		},
	});
};
// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
// From: https://github.com/lfades/next-with-apollo/issues/38#issuecomment-464830974
export default withApollo(
	({ ctx, initialState }) => {
		return initApolloClient(ctx, initialState);
	},
	// { getDataFromTree: 'never' },
);
