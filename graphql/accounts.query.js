import gql from 'graphql-tag';

const ACCOUNTS_QUERY = gql`
	query Accounts {
		accounts {
			account_id
			name
			balances
			type
			account_item {
				name
			}
			account_assignments {
				type
			}
		}
	}
`;

export default ACCOUNTS_QUERY;
