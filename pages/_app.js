import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../utils/apollo-client';

import '../components/base.scss';

class MyApp extends App {
	render() {
		const { Component, pageProps, apollo } = this.props;
		return (
			<ApolloProvider client={apollo}>
				<Component
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...pageProps}
				/>
			</ApolloProvider>
		);
	}
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);
