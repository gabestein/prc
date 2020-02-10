import './quiz.scss';
import { useQuery } from '@apollo/react-hooks';
import QUIZ_QUERY from '../../graphql/quiz.query';

const Quiz = () => {
	const { data, loading, error } = useQuery(QUIZ_QUERY);
	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <pre>Error: {JSON.stringify(error)}</pre>;
	}
	return (
		<div className="quiz">
			<h2>About You</h2>
		</div>
	);
};

export default Quiz;
