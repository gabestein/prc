import fetch from 'isomorphic-unfetch';

export default async function plaid_webhook(req, res) {
	console.log(JSON.stringify(req.body));
	res.status(200).json('ok');
}
