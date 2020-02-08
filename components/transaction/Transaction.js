import PropTypes from 'prop-types';
import { Card, RadioGroup, Radio } from '@blueprintjs/core';
import moment from 'moment';
import './transaction.scss';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { formatCurrency } from '../../utils/helpers';
import UPDATE_TRANSACTION_PORTION from '../../graphql/transactions.update_portion';

const Transaction = (props) => {
	const { transaction } = props;
	let refund;
	if (transaction.amount < 0) {
		refund = true;
	}
	const [portion, setPortion] = useState(transaction.user_portion);
	const [updateTransaction] = useMutation(UPDATE_TRANSACTION_PORTION);

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
					<RadioGroup
						inline={true}
						selectedValue={portion}
						onChange={(value) => {
							setPortion(value.currentTarget.value);
						}}
					>
						<Radio label="Neccessities" value="needs" />
						<Radio label="Present You" value="wants" />
						<Radio label="Future You" value="savings" />
					</RadioGroup>
					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							updateTransaction({
								variables: {
									transactionId: transaction.transaction_id,
									portion: portion,
								},
							});
						}}
					>
						{transaction.user_portion ? `Change` : `Approve`}
					</button>
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
