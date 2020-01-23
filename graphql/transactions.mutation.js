import gql from 'graphql-tag';

const TRANSACTIONS_MUTATION = gql`
	mutation($transactionsInput: [transactions_insert_input!]!) {
		insert_transactions(objects: $transactionsInput) {
			returning {
				transaction_id
			}
		}
	}
`;

export default TRANSACTIONS_MUTATION;
