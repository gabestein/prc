import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';

const Account = (props) => {
	const { account } = props;
	return (
		<div className={`accounts ${account.account_item.error && `error`}`}>
			{account.account_item.name} {account.name}: {formatCurrency(account.balances.current)} |{' '}
			{account.account_assignments[0] ? account.account_assignments[0].type : ''}
			{account.account_item.error && `Relink account`}
		</div>
	);
};

Account.propTypes = {
	account: PropTypes.object.isRequired,
	error: PropTypes.bool,
};

Account.defaultProps = {
	error: false,
};

export default Account;
