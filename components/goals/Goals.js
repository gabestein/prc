import PropTypes from 'prop-types';
import './goals.scss';
import { useQuery } from '@apollo/react-hooks';
import GOALS_QUERY from '../../graphql/goals.query';

const Goals = (props) => {
	const { transactions } = props;
	const { error, loading, data } = useQuery(GOALS_QUERY);
	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <pre>Error: {JSON.stringify(error)}</pre>;
	}

	return (
		<div className="goals">
			<h2>Goals</h2>
		</div>
	);
};

Goals.propTypes = {
	transactions: PropTypes.array.isRequired,
};

export default Goals;
