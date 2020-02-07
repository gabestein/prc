import fetch from 'isomorphic-unfetch';
import React from 'react';
import auth0 from './auth0';

const UserContext = React.createContext(null);
export default UserContext;

export async function fetchUser(req) {
	let User;
	if (User) {
		return User;
	}
	// If we're on the server, get the user directly
	if (typeof window === 'undefined') {
		console.log('hit server');
		try {
			const session = await auth0.getSession(req);
			if (!session || !session.user) {
				User = null;
				return User;
			}
			User = session.user;
			return User;
		} catch (err) {
			console.warn(err);
			return err;
		}
		// If we're on the client, get the user via the API
	} else {
		try {
			console.log('hit client');
			const session = await fetch('/api/session');
			const user = await session.json();
			User = user;
			return User;
		} catch (err) {
			console.warn(err);
			return err;
		}
	}
}
