import gql from 'graphql-tag';

const PROFILE_QUERY = gql`
	query Profile {
		users {
			user_id
			income
			retirement
		}
	}
`;

export default PROFILE_QUERY;
