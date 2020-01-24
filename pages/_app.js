import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import withData from '../utils/apollo-client';
import { fetchUser } from '../utils/user';
import Layout from '../components/Layout';
import '../components/base.scss';

class ExpenseApp extends App {
	render() {
		const { Component, pageProps, apollo, user } = this.props;
		return (
			<Layout user={user}>
				{user && (
					<ApolloProvider client={apollo}>
						<Component
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...pageProps}
						/>
					</ApolloProvider>
				)}
				{!user && <p>Hello, please log in.</p>}
			</Layout>
		);
	}
}

ExpenseApp.getInitialProps = async ({ ctx: { req } }) => {
	const user = await fetchUser(req);
	return { user: user };
};

ExpenseApp.propTypes = {
	user: PropTypes.object,
};

ExpenseApp.defaultProps = {
	user: {},
};

// Wraps all components in the tree with the data provider
export default withData(ExpenseApp);
