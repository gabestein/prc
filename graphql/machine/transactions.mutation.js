import gql from 'graphql-tag';

export const TRANSACTIONS_REMOVE_MUTATION = gql`
	mutation update_transactions($transactions: [String!]!) {
		update_transactions(
			where: { transaction_id: { _in: $transactions } }
			_set: { removed: true }
		) {
			returning {
				transaction_id
			}
		}
	}
`;

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
