import auth0 from '../../utils/auth0';

export default async function getSession(req, res) {
	try {
		const session = await auth0.getSession(req);
		if (!session || !session.user) {
			res.writeHead(302, { Location: '/api/login' });
			res.end();
		} else {
			res.status(200).json(session.user);
		}
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
