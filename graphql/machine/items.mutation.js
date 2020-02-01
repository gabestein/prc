import gql from 'graphql-tag';

const ITEM_DATE_UPDATE = gql`
	mutation update_items($itemId: String!, $dateLastChecked: timestamptz!) {
		update_items(
			where: { item_id: { _eq: $itemId } }
			_set: { date_last_checked: $dateLastChecked }
		) {
			returning {
				item_id
				name
			}
		}
	}
`;

export default ITEM_DATE_UPDATE;
