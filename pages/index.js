import { useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import UserContext from '../utils/user';

import TRANSACTIONS_QUERY from '../graphql/transactions.query';

const Home = () => {
	const user = useContext(UserContext);
	if (!user) {
		return <p>Please log in.</p>;
	}

	// Create a query hook
	const { data, loading, error } = useQuery(TRANSACTIONS_QUERY);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <pre>Error: {JSON.stringify(error)}</pre>;
	}

	return (
		<div>
			<ul>
				{data.transactions.map((transaction) => {
					return <li key={`job__${transaction.transaction_id}`}>{transaction.name}</li>;
				})}
			</ul>
		</div>
	);
};

export default Home;
