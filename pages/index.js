import { useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import UserContext from '../utils/user';
import Transaction from '../components/transaction/Transaction';
import Goals from '../components/goals/Goals';
import Accounts from '../components/accounts/Accounts';
import Quiz from '../components/quiz/Quiz';
import Portions from '../components/portions/Portions';
import MonthSelector from '../components/monthSelector/MonthSelector';
import TRANSACTIONS_QUERY from '../graphql/transactions.query';

const Home = () => {
	const user = useContext(UserContext);
	if (!user) {
		return <p>Please log in.</p>;
	}

	let startDate;
	let endDate;

	const router = useRouter();
	if (router.query.startDate && router.query.endDate) {
		startDate = router.query.startDate;
		endDate = router.query.endDate;
	} else {
		startDate = moment(endDate)
			.utc()
			.startOf('month')
			.format('YYYY-MM-DD');
		endDate = moment()
			.utc()
			.format('YYYY-MM-DD');
	}
	// Create a query hook
	const { data, loading, error } = useQuery(TRANSACTIONS_QUERY, {
		variables: { startDate: startDate, endDate: endDate },
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
		if (!a.user_portion) return -1;
		if (a.user_portion < b.user_portion) return -1;
		return 1;
	});
	return (
		<div>
			<section className="journey">
				{/* <Goals transactions={transactions} /> */}
				<Accounts />
				<Quiz />
			</section>
			<section className="portions">
				<MonthSelector current={endDate} />
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
