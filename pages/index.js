import { useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import UserContext from '../utils/user';
import Transaction from '../components/transaction/Transaction';
import Summary from '../components/summary/Summary';
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
		<div className="transactions">
			<Summary transactions={data.transactions} />
			{data.transactions.map((transaction) => {
				return (
					<Transaction
						key={`transaction__${transaction.transaction_id}`}
						transaction={transaction}
					/>
				);
			})}
		</div>
	);
};

export default Home;
