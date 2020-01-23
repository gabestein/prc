import fetch from 'isomorphic-unfetch';
import React from 'react';
import auth0 from './auth0';

const UserContext = React.createContext(null);
export default UserContext;

export async function fetchUser(req) {
	// If we're on the server, get the user directly
	if (typeof window === 'undefined') {
		try {
			const session = await auth0.getSession(req);
			if (!session || !session.user) {
				return null;
			}
			return session.user;
		} catch (err) {
			console.warn(err);
			return err;
		}
		// If we're on the client, get the user via the API
	} else {
		try {
			const session = await fetch('/api/session');
			const { user } = await session.json();
			return user;
		} catch (err) {
			console.warn(err);
			return err;
		}
	}
}
