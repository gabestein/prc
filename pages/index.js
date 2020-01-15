import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import JOBS_QUERY from '../graphql/jobs.query';
import auth0 from '../utils/auth0';

const Home = (props) => {
	// Create a query hook
	const { data, loading, error } = useQuery(JOBS_QUERY);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {JSON.stringify(error)}</p>;
	}
	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{props.user.nickname ? (
				<>
					<h2>Hello, {props.user.nickname}</h2>
					<a href="/api/logout">Logout</a>
				</>
			) : (
				<a href="/api/login">Login</a>
			)}
			<h1>Simple Expenses</h1>
			<ul>
				{data.jobs.map((job) => {
					return <li key={`job__${job.id}`}>{job.title}</li>;
				})}
			</ul>
		</div>
	);
};

Home.getInitialProps = async ({ req }) => {
	if (typeof window === 'undefined') {
		const session = await auth0.getSession(req);
		if (!session || !session.user) {
			return {};
		}
		return { user: session.user };
	}
	return {};
};

Home.propTypes = {
	user: PropTypes.object,
};

Home.defaultProps = {
	user: {},
};

export default Home;
