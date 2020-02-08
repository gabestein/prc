import ApolloClient, { InMemoryCache, defaultDataIdFromObject } from 'apollo-boost';
import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';
import auth0 from './auth0';

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URI = process.env.GRAPHQL_URI;

const getTokenFromLocalCookie = async () => {
	try {
		const res = await fetch('/api/token');
		const { idToken } = await res.json();
		return idToken;
	} catch (err) {
		return null;
	}
};

const getTokenFromServerCookie = async (req) => {
	try {
		const { idToken } = await auth0.getSession(req);
		return idToken;
	} catch (err) {
		/* res.writeHead(302, {
			Location: '/api/login',
		});
		res.end(); */
		return null;
	}
};

// todo: pass admin token info here for webhook requests...probably need to use m2m eventually
export const initApolloClient = (ctx, initialState, authToken) => {
	return new ApolloClient({
		fetch,
		uri: GRAPHQL_URI,
		cache: new InMemoryCache({
			dataIdFromObject: (object) => {
				const knownTypeIds = {
					transactions: 'transaction',
					accounts: 'account',
					items: 'item',
				};
				if (knownTypeIds[object.__typename]) {
					return `${object.__typename}_${
						object[`${knownTypeIds[object.__typename]}_id`]
					}`;
				}
				return defaultDataIdFromObject(object);
			},
		}).restore(initialState || {}),
		request: async (operation) => {
			let token = authToken;
			if (!authToken) {
				token = process.browser
					? await getTokenFromLocalCookie()
					: await getTokenFromServerCookie(ctx.req, ctx.res);
			}
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
