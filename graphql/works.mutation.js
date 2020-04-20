import gql from 'graphql-tag';

const WORKS_UPSERT = gql`
	mutation upsert_works($worksInput: [works_insert_input!]!) {
		insert_works(
			objects: $worksInput
			on_conflict: { constraint: works_pkey, update_columns: [] }
		) {
			returning {
				doi
			}
		}
	}
`;

export default WORKS_UPSERT;
