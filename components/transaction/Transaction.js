import PropTypes from 'prop-types';
import {
	Card,
	RadioGroup,
	Radio,
	Popover,
	PopoverInteractionKind,
	Position,
} from '@blueprintjs/core';
import moment from 'moment';
import './transaction.scss';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { formatCurrency } from '../../utils/helpers';
import UPDATE_TRANSACTION_PORTION from '../../graphql/transactions.update_portion';

const LabelTooltip = ({ label, content }) => {
	return (
		<span>
			{label}
			<Popover
				interactionKind={PopoverInteractionKind.HOVER}
				position={Position.TOP}
				popoverClassName="bp3-popover-content-sizing"
				content={<p>{content}</p>}
			>
				<span className="help">?</span>
			</Popover>
		</span>
	);
};
const Transaction = (props) => {
	const { transaction } = props;
	let refund;
	if (transaction.amount < 0) {
		refund = true;
	}
	const [portion, setPortion] = useState(transaction.user_portion);
	const [updateTransaction] = useMutation(UPDATE_TRANSACTION_PORTION);

	return (
		<Card interactive={true} className={`transaction ${transaction.user_portion}`}>
			<section className="basics">
				<div className="date">{moment(transaction.date).format('dddd MMMM Do, YYYY')}</div>
				<div className="name">{transaction.name}</div>
				<div className="category">{transaction.category[0]}</div>
				<div className={`amount ${refund ? 'refund' : ''}`}>
					{refund ? `+` : '-'}
					{formatCurrency(Math.abs(transaction.amount))}
				</div>
				<section className="controls">
					{refund ? (
						<RadioGroup
							inline={true}
							selectedValue={portion}
							onChange={(value) => {
								setPortion(value.currentTarget.value);
							}}
						>
							<Radio
								label={
									<LabelTooltip
										label="Income"
										content="Money you made, from any source."
									/>
								}
								value="income"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Internal Transfer"
										content="Money that you moved from one of your accounts to another, including payments into your credit accounts."
									/>
								}
								value="transfers"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Paybacks (Essentials)"
										content="Income that was a payback for money you spent on the usual stuff."
									/>
								}
								value="needsPaybacks"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Paybacks (Treats)"
										content="Income that was a payback for money you spent for fun."
									/>
								}
								value="wantsPaybacks"
							/>
						</RadioGroup>
					) : (
						<RadioGroup
							inline={true}
							selectedValue={portion}
							onChange={(value) => {
								setPortion(value.currentTarget.value);
							}}
						>
							<Radio
								label={
									<LabelTooltip
										label="Debt Payoff"
										content="Payments made against debt – credit cards, student loans, etc."
									/>
								}
								value="payoffs"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Essentials – Normal Stuff"
										content="Money you spent on the basics – housing, utilities, phone and internet, basic food, basic clothes, etc."
									/>
								}
								value="needs"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Essentials – Emergencies"
										content="Money you spent on essentials that you didn't plan for – doctor's visit, appliance broke down, etc."
									/>
								}
								value="unplannedNeeds"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Treats - Planned"
										content="Money you planned to spend on fancy things like trips, massages, etc."
									/>
								}
								value="wants"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Treats - Just Because"
										content="Money you spent spur of the moment on things beyond the basics – fancy meals, fancy clothes, a trip, etc."
									/>
								}
								value="unplannedWants"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Future You - New"
										content="Payments you made to your future self – usually transfers to savings."
									/>
								}
								value="savings"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Future You - Deployed"
										content="Future you money spent on a goal like a house or other investment."
									/>
								}
								value="activeSavings"
							/>
							<Radio
								label={
									<LabelTooltip
										label="Ignore"
										content="Use rarely. This is almost always due to an expense that had to go through multiple accounts."
									/>
								}
								value="ignore"
							/>
						</RadioGroup>
					)}
				</section>
				<section className="button">
					<button
						type="submit"
						disabled={transaction.user_portion === portion}
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

LabelTooltip.propTypes = {
	label: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};

Transaction.propTypes = {
	transaction: PropTypes.object.isRequired,
};

export default Transaction;
