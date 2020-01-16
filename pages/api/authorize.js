export default async function authorize(req, res) {
	try {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ 'X-Hasura-Role': 'admin', ...req.headers }));
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
