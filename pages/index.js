import { useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import UserContext from '../utils/user';

const Home = () => {
	const user = useContext(UserContext);
	if (!user) {
		return <p>Please log in.</p>;
	}
	return (
		<div>
			<h1>Hi</h1>
		</div>
	);
};

export default Home;
