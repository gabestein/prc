import PlaidLink from 'react-plaid-link';
import Layout from '../components/Layout';

const handleOnSuccess = (token, metadata) => {
	console.log('success', token, metadata);
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
