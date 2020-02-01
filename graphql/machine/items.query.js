import gql from 'graphql-tag';

const ITEMS_QUERY = gql`
	query Items($itemId: String!) {
		items(where: { item_id: { _eq: $itemId } }) {
			item_id
			name
			access_token
			date_last_checked
			item_accounts {
				account_id
				name
			}
		}
	}
`;

export default ITEMS_QUERY;
