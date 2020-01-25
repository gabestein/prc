import auth0 from '../../utils/auth0';

export default async function token(req, res) {
	try {
		const { idToken } = await auth0.getSession(req);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ idToken: idToken }));
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
}
