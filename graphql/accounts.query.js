import gql from 'graphql-tag';

const ACCOUNTS_QUERY = gql`
	query Accounts {
		accounts {
			account_id
			name
			balances
			type
			account_item {
				item_id
				name
			}
			account_assignments {
				type
			}
		}
	}
`;

export default ACCOUNTS_QUERY;
