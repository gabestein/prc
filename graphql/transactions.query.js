import gql from 'graphql-tag';

const TRANSACTIONS_QUERY = gql`
	query Transactions {
		transactions(order_by: { date: desc }) {
			transaction_id
			name
			category
			amount
			date
			payment_channel
			location
			transaction_account {
				name
				type
				account_item {
					name
				}
			}
		}
	}
`;

export default TRANSACTIONS_QUERY;
