import gql from 'graphql-tag';
import moment from 'moment';

const yearAgo = moment()
	.utc()
	.subtract(1, 'years')
	.format();

const QUIZ_QUERY = gql`
	query Quizzes {
		quizzes(where: {date_created: {_lt: "${yearAgo}"}}) {
			income
			expenses
			people
			date_created
		}
	}
`;

export default QUIZ_QUERY;
