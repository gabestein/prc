import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import './portions.scss';
import { getPortions, formatCurrency } from '../../utils/helpers';
import PROFILE_QUERY from '../../graphql/profile.query';

const Portions = (props) => {
	const { data, loading, error } = useQuery(PROFILE_QUERY);
	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <pre>Error: {JSON.stringify(error)}</pre>;
	}
	const profile = data.users[0];
	const { transactions } = props;
	const portions = getPortions(transactions);
	return (
		<div className="portions">
			<h2>Portions</h2>
			<div className="amounts">
				<div className="income">
					<h3>Income</h3>
					<p>Earned: +{formatCurrency(portions.income)}</p>
					<p>Expected: +{formatCurrency(profile.income)}</p>
				</div>
				<div className="needs">
					<h3>
						Essentials:{' '}
						{Math.round(
							-(
								(portions.needs +
									portions.unplannedNeeds +
									portions.needsPaybacks) /
								profile.income
							) * 100,
						)}
						%
					</h3>
					<p>Normal Stuff: {formatCurrency(portions.needs)}</p>
					<p>Emergencies: {formatCurrency(portions.unplannedNeeds)}</p>
					<p>Paybacks: {formatCurrency(portions.needsPaybacks)}</p>
					<p>
						Net:{' '}
						{formatCurrency(
							portions.needs + portions.unplannedNeeds + portions.needsPaybacks,
						)}
					</p>
				</div>
				<div className="wants">
					<h3>
						Treats:{' '}
						{Math.round(
							-(
								(portions.wants +
									portions.unplannedWants +
									portions.wantsPaybacks) /
								profile.income
							) * 100,
						)}
						%
					</h3>
					<p>Planned Treats: {formatCurrency(portions.wants)}</p>
					<p>Just Because: {formatCurrency(portions.unplannedWants)}</p>
					<p>Paybacks: {formatCurrency(portions.wantsPaybacks)}</p>
					<p>
						Net:{' '}
						{formatCurrency(
							portions.wants + portions.unplannedWants + portions.wantsPaybacks,
						)}
					</p>
				</div>
				<div className="savings">
					<h3>
						Future You:{' '}
						{Math.round(
							Math.abs((portions.savings + profile.retirement) / profile.income) *
								100,
						)}
						%
					</h3>
					<p>New: +{formatCurrency(portions.savings)}</p>
					<p>Automatic: +{formatCurrency(profile.retirement)}</p>
					<p>Deployed: +{formatCurrency(portions.activeSavings)}</p>
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
