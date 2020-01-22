import plaid from 'plaid';

const plaidClient = new plaid.Client(
	process.env.PLAID_CLIENT_ID,
	process.env.PLAID_SECRET,
	process.env.PLAID_PUBLIC_KEY,
	plaid.environments.sandbox,
);

export default async function getPlaidToken(req, res) {
	try {
		const publicToken = JSON.parse(req.body).publicToken;
		plaidClient.exchangePublicToken(publicToken, function(err, plaidRes) {
			const accessToken = plaidRes.access_token;
			plaidClient.getAccounts(accessToken, function(err, accountRes) {
				console.log(accountRes.accounts);
				res.status(200);
			});
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 400).end(error.message);
	}
}
