import gql from 'graphql-tag';

const SINGLE_WORK_QUERY = gql`
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

export default SINGLE_WORK_QUERY;
