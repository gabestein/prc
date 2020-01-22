import PlaidLink from 'react-plaid-link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

const handleOnSuccess = (token, metadata) => {
	console.log('success', token, metadata);
	fetch(`${process.env.APP_URI}/api/get_plaid_token`, {
		method: 'post',
		body: JSON.stringify({ publicToken: token }),
	})
	.then((res) => res.json())
	.then((json) => console.log(json));
};

const handleOnExit = (token, metadata) => {
	console.log('exit');
};

const Link = () => {
	return (
		<Layout>
			<PlaidLink
				clientName="Your app name"
				env="sandbox"
				product={['transactions']}
				publicKey={process.env.PLAID_PUBLIC_KEY}
				onExit={handleOnExit}
				onSuccess={handleOnSuccess}
			>
				Open Link and connect your bank!
			</PlaidLink>
		</Layout>
	);
};

export default Link;