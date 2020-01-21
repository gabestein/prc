import fetch from 'isomorphic-unfetch';

export default async function authorize(req, res) {
	try {
		const infoRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
			headers: {
				authorization: req.headers.authorization,
			},
		});
		const userInfo = await infoRes.json();
		let role = 'anonymous';
		let userId = null;

		if (userInfo) {
			role = 'user';
			userId = userInfo.sub.split('|')[1];
		}

		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(
			JSON.stringify({
				'X-Hasura-Role': role,
				'X-Hasura-User-Id': userId,
			}),
		);
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
