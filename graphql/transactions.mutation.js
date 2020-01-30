import gql from 'graphql-tag';

const TRANSACTIONS_MUTATION = gql`
	mutation upsert_transactions($transactionsInput: [transactions_insert_input!]!) {
		insert_transactions(
			objects: $transactionsInput
			on_conflict: { constraint: transactions_pkey, update_columns: [] }
		) {
			returning {
				transaction_id
			}
		}
	}
`;

export default TRANSACTIONS_MUTATION;
