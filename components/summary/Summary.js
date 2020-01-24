import PropTypes from 'prop-types';
import './summary.scss';
import { getTotalOut, getTotalIn, formatCurrency } from '../../utils/helpers';

const Summary = (props) => {
	const { transactions } = props;
	const totalOut = getTotalOut(transactions);
	const totalIn = getTotalIn(transactions);
	const net = totalIn - totalOut;

	return (
		<div className="summary">
			<h2>Summary</h2>
			<div>Total Out: {formatCurrency(totalOut)}</div>
			<div>Total In: {formatCurrency(totalIn)}</div>
			<div>Net: {formatCurrency(net)}</div>
		</div>
	);
};

Summary.propTypes = {
	transactions: PropTypes.array.isRequired,
};

export default Summary;
