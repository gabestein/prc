import { useQuery } from '@apollo/react-hooks';

import TRANSACTIONS_QUERY from '../graphql/transactions.query';

const Home = () => {
	// Create a query hook
	const { data, loading, error } = useQuery(TRANSACTIONS_QUERY);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {JSON.stringify(error)}</p>;
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
