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
				<div className="income">
					<h3>Income</h3>
					<p>New Money: +{formatCurrency(portions.income)}</p>
				</div>
				<div className="wants">
					<h3>
						Just Because:{' '}
						{Math.round(
							-((portions.wants + portions.wantsPaybacks) / portions.income) * 100,
						)}
						%
					</h3>
					<p>Money spent: {formatCurrency(portions.wants)}</p>
					<p>Paybacks: {formatCurrency(portions.wantsPaybacks)}</p>
				</div>
				<div className="needs">
					<h3>
						Normal Stuff:{' '}
						{Math.round(
							-((portions.needs + portions.needsPaybacks) / portions.income) * 100,
						)}
						%
					</h3>
					<p>Money spent: {formatCurrency(portions.needs)}</p>
					<p>Paybacks: {formatCurrency(portions.needsPaybacks)}</p>
				</div>
				<div className="savings">
					<h3>
						Future You: {Math.round(Math.abs(portions.savings / portions.income) * 100)}
						%
					</h3>
					<p>New Money: +{formatCurrency(portions.savings)}</p>
					<p>Debt Payoff (wash): {formatCurrency(portions.payoffs)}</p>
					<p>Internal Transfers (wash): {formatCurrency(portions.transfers)}</p>
				</div>
			</div>
		</div>
	);
};

Portions.propTypes = {
	transactions: PropTypes.array.isRequired,
};

export default Portions;
