import gql from 'graphql-tag';

const ITEMS_MUTATION = gql`
	mutation(
		$accessToken: String!
		$itemId: String!
		$institutionId: String!
		$name: String!
		$accountsInput: [accounts_insert_input!]!
	) {
		insert_items(
			objects: {
				access_token: $accessToken
				item_id: $itemId
				institution_id: $institutionId
				name: $name
			}
		) {
			returning {
				item_id
				name
			}
		}
		insert_accounts(objects: $accountsInput) {
			returning {
				account_id
				name
			}
		}
	}
`;

export default ITEMS_MUTATION;
