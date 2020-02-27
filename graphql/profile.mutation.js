import gql from 'graphql-tag';

const PROFILE_MUTATION = gql`
	mutation update_user($income: numeric!, $retirement: numeric!) {
		update_users(where: {}, _set: { income: $income, retirement: $retirement }) {
			returning {
				user_id
				income
				retirement
			}
		}
	}
`;

export default PROFILE_MUTATION;
