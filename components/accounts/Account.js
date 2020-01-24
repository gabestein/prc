import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';

const Account = (props) => {
	const { account } = props;
	return (
		<div className="accounts">
			{account.account_item.name} {account.name}: {formatCurrency(account.balances.current)}
		</div>
	);
};

Account.propTypes = {
	account: PropTypes.object.isRequired,
};

export default Account;
