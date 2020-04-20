import gql from 'graphql-tag';

const SINGLE_WORK_QUERY = gql`
	query Works($doi: String!) {
		works(where: { doi: { _eq: $doi } }) {
			doi
		}
	}
`;

export default SINGLE_WORK_QUERY;
