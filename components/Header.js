import { useContext } from 'react';
import Head from 'next/head';
import UserContext from '../utils/user';

const Header = () => {
	const user = useContext(UserContext);
	return (
		<div>
			<Head>
				<title>Really Simple Budget</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<h1>Really Simple Budget</h1>
			{user && user.nickname ? (
				<>
					<h2>Hello, {user.nickname}</h2>
					<a href="/api/logout">Logout</a>
				</>
			) : (
				<a href="/api/login">Login</a>
			)}
		</div>
	);
};

export default Header;
