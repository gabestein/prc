// import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import ACCOUNTS_QUERY from '../../graphql/accounts.query';
import Account from './Account';
import Link from '../link/Link';

import './accounts.scss';

const Accounts = (/* props */) => {
	const { data, loading, error } = useQuery(ACCOUNTS_QUERY);
	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <pre>Error: {JSON.stringify(error)}</pre>;
	}

	return (
		<div className="accounts">
			<h2>Accounts</h2>
			{data.accounts.map((account) => {
				return <Account key={`account__${account.account_id}`} account={account} />;
			})}
			<Link />
		</div>
	);
};

// Accounts.propTypes = {};

export default Accounts;
