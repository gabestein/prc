import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
	domain: process.env.AUTH0_DOMAIN,
	clientId: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	scope: 'openid profile',
	redirectUri: `${process.env.BASE_URI}/api/callback`,
	postLogoutRedirectUri: `${process.env.BASE_URI}/`,
	session: {
		cookieSecret: process.env.SESSION_COOKIE_SECRET,
		cookieLifetime: 7200,
		storeAccessToken: true,
		storeIdToken: true,
	},
});
