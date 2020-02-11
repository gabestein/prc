import gql from 'graphql-tag';

const GOALS_QUERY = gql`
	query Goals {
		goals {
			goal_id
			goal_type
			goal_amount
			accounts_in_goal {
				goal_account {
					balances
				}
			}
		}
	}
`;

export default GOALS_QUERY;
