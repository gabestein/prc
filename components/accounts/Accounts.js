// import PropTypes from 'prop-types';
import './accounts.scss';
import { useQuery } from '@apollo/react-hooks';
import ACCOUNTS_QUERY from '../../graphql/accounts.query';
import Account from './Account';

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
				return <Account account={account} />;
			})}
		</div>
	);
};

// Accounts.propTypes = {};

export default Accounts;
