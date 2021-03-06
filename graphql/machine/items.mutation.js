import gql from 'graphql-tag';

const ITEMS_MUTATION = gql`
	mutation update_items(
		$itemId: String!
		$dateLastChecked: timestamptz
		$error: Boolean = false
	) {
		update_items(
			where: { item_id: { _eq: $itemId } }
			_set: { date_last_checked: $dateLastChecked, error: $error }
		) {
			returning {
				item_id
				name
			}
		}
	}
`;

export default ITEMS_MUTATION;
