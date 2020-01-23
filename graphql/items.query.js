import gql from 'graphql-tag';

const ITEMS_QUERY = gql`
	query Items {
		items {
			item_id
			name
			access_token
			item_accounts {
				account_id
				name
			}
		}
	}
`;

export default ITEMS_QUERY;
