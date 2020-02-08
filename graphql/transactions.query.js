import gql from 'graphql-tag';

const TRANSACTIONS_QUERY = gql`
	query Transactions(
		$startDate: date
		$endDate: date
		$userPortionOrder: order_by = asc_nulls_first
		$dateOrder: order_by = desc
	) {
		transactions(
			where: { _and: [{ date: { _gte: $startDate } }, { date: { _lte: $endDate } }] }
			order_by: [
				{ user_portion: $userPortionOrder }
				{ date: $dateOrder }
				{ transaction_id: desc }
			]
		) {
			transaction_id
			name
			category
			amount
			date
			payment_channel
			location
			user_portion
			transaction_account {
				account_id
				name
				type
				account_item {
					item_id
					name
				}
			}
		}
	}
`;

export default TRANSACTIONS_QUERY;
