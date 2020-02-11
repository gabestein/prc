import gql from 'graphql-tag';

const ITEMS_QUERY = gql`
	query Items {
		items {
			item_id
			name
			access_token
			date_last_checked
			user_id
			institution_id
			item_accounts {
				account_id
				name
				mask
			}
		}
	}
`;

export default ITEMS_QUERY;
