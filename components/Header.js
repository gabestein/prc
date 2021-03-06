import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import UserContext from '../utils/user';

const Header = () => {
	const user = useContext(UserContext);
	return (
		<>
			<Head>
				<title>PRC Collector</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<header className="main">
				<div className="logo">
					<h1>PRC Collector {process.env.PLAID_ENV}</h1>
					<h2>All the reviews.</h2>
				</div>
				<nav className="main">
					<ul>
						{user && user.nickname ? (
							<>
								<li>
									<Link href="/">
										<a>Hello, {user.nickname}</a>
									</Link>
								</li>
								<li>
									<a href="/api/logout">Logout</a>
								</li>
							</>
						) : (
							<li>
								<a href="/api/login">Login</a>
							</li>
						)}
						<li>
							<Link href="/about">
								<a>About</a>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Header;
