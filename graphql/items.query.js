import gql from 'graphql-tag';

const ITEMS_QUERY = gql`
	query Works($doi: String!) {
		works(where: { doi: { _eq: $doi } }) {
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
`;

export default ITEMS_QUERY;
