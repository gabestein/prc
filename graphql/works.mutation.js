import gql from 'graphql-tag';

const WORKS_UPSERT = gql`
	mutation upsert_works($worksInput: [works_insert_input!]!) {
		insert_works(
			objects: $worksInput
			on_conflict: { constraint: works_pkey, update_columns: [] }
		) {
			returning {
				doi
				publisher
				type
				publishedPrint
				created
				source
				title
				author
				containerTitle
				url
				link
				shortContainerTitle
				children {
					relation_type
					child {
						doi
						publisher
						type
						publishedPrint
						created
						source
						title
						author
						containerTitle
						url
						link
						shortContainerTitle
					}
				}
			}
		}
	}
`;

export default WORKS_UPSERT;
