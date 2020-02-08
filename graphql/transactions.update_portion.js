import gql from 'graphql-tag';

const UPDATE_TRANSACTION_PORTION = gql`
	mutation update_transactions($transactionId: String!, $portion: String!) {
		update_transactions(
			where: { transaction_id: { _eq: $transactionId } }
			_set: { user_portion: $portion }
		) {
			returning {
				transaction_id
				user_portion
				date
			}
		}
	}
`;

export default UPDATE_TRANSACTION_PORTION;
