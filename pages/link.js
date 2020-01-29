import PlaidLink from 'react-plaid-link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

const handleOnSuccess = (token, metadata) => {
	console.log(metadata);
	fetch(`${process.env.APP_URI}/api/get_plaid_token`, {
		method: 'post',
		body: JSON.stringify({ publicToken: token, institution: metadata.institution }),
	})
	.then((res) => res.json())
	.then((json) => console.log(json));
};

const handleOnExit = (token, metadata) => {
	console.log('exit');
};

const Link = () => {
	return (
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
	);
};

export default Link;
