import auth0 from '../../utils/auth0';

export default async function token(req, res) {
	try {
		const tokenCache = await auth0.tokenCache(req, res);
		const { accessToken } = await tokenCache.getAccessToken();
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ accessToken: accessToken }));
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
}
