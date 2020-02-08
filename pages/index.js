import { useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import moment from 'moment';
import UserContext from '../utils/user';
import Transaction from '../components/transaction/Transaction';
import Summary from '../components/summary/Summary';
import Accounts from '../components/accounts/Accounts';
import Quiz from '../components/quiz/Quiz';
import Portions from '../components/portions/Portions';
import TRANSACTIONS_QUERY from '../graphql/transactions.query';

const today = moment()
	.utc()
	.subtract(1, 'month')
	.endOf('month');
const monthago = moment(today)
	.utc()
	.subtract(1, 'month')
	.endOf('month');

const Home = () => {
	const user = useContext(UserContext);
	if (!user) {
		return <p>Please log in.</p>;
	}

	// Create a query hook
	const { data, loading, error } = useQuery(TRANSACTIONS_QUERY, {
		variables: { startDate: monthago, endDate: today },
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <pre>Error: {JSON.stringify(error)}</pre>;
	}
	const { transactions } = data;
	// do manual sorting because apollo's cache doesn't seem to update sort order
	transactions.sort((a, b) => {
		if (!a.user_portion && b.user_portion) return -1;
		return 1;
	});
	return (
		<div>
			<section className="journey">
				<Summary transactions={transactions} />
				<Accounts />
				<Quiz />
			</section>
			<section className="portions">
				<Portions transactions={transactions} />
			</section>
			<section className="transactions">
				{transactions.map((transaction) => {
					return (
						<Transaction
							key={`transaction__${transaction.transaction_id}`}
							transaction={transaction}
						/>
					);
				})}
			</section>
		</div>
	);
};

export default Home;
