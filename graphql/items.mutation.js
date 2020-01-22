import gql from 'graphql-tag';

const ITEMS_MUTATION = gql`
	mutation($accessToken: String!, $itemId: String!, $accountsInput: [accounts_insert_input!]!) {
		insert_items(objects: { access_token: $accessToken, item_id: $itemId }) {
			returning {
				item_id
			}
		}
		insert_accounts(objects: $accountsInput) {
			returning {
				name
			}
		}
	}
`;

export default ITEMS_MUTATION;
