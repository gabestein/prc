import PropTypes from 'prop-types';
import './portions.scss';
import { getPortions, formatCurrency } from '../../utils/helpers';

const Portions = (props) => {
	const { transactions } = props;
	const portions = getPortions(transactions);
	return (
		<div className="portions">
			<h2>Portions</h2>
			<div className="amounts">
				<div className="un">
					<h3>Total Income</h3>
					<p>{formatCurrency(portions.income)}</p>
				</div>
				<div className="wants">
					<h3>Present You</h3>
					<p>{formatCurrency(portions.wants)}</p>
				</div>
				<div className="needs">
					<h3>Neccessities</h3>
					<p>{formatCurrency(portions.needs)}</p>
				</div>
				<div className="savings">
					<h3>Future You</h3>
					<p>Debt Payoff: {formatCurrency(portions.debt)}</p>
					<p>New Money: {formatCurrency(portions.savings)}</p>
				</div>
			</div>
		</div>
	);
};

Portions.propTypes = {
	transactions: PropTypes.array.isRequired,
};

export default Portions;
