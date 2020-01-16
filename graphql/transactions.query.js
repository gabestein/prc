import gql from 'graphql-tag';

const TRANSACTIONS_QUERY = gql`
	query Transactions {
		transactions {
			transaction_id
			name
		}
	}
`;

export default TRANSACTIONS_QUERY;
