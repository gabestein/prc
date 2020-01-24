import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';
import moment from 'moment';
import './transaction.scss';
import { formatCurrency } from '../../utils/helpers';

const Transaction = (props) => {
	const { transaction } = props;
	let refund;
	if (transaction.amount < 0) {
		refund = true;
	}
	return (
		<Card interactive={true} className="transaction">
			<section className="basics">
				<div className="date">{moment(transaction.date).format('dddd MMMM Do, YYYY')}</div>
				<div className="name">{transaction.name}</div>
				<div className="category">{transaction.category[0]}</div>
				<div className={`amount ${refund ? 'refund' : ''}`}>
					{formatCurrency(transaction.amount)}
				</div>
				<section className="controls">
					<button>Approve</button>
				</section>
			</section>
			<section className="details">
				<div className="account">
					{transaction.transaction_account.account_item.name}{' '}
					{transaction.transaction_account.name}
				</div>
				<div className="type">{transaction.payment_channel}</div>
			</section>
		</Card>
	);
};

Transaction.propTypes = {
	transaction: PropTypes.object.isRequired,
};

export default Transaction;
