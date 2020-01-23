import PropTypes from 'prop-types';
import Header from './Header';
import UserContext from '../utils/user';

import './base.scss';

const Layout = (props) => (
	<UserContext.Provider value={props.user}>
		<div className="layout">
			<div className="container">
				<Header />
				{props.children}
			</div>
		</div>
	</UserContext.Provider>
);

Layout.propTypes = {
	children: PropTypes.object.isRequired,
	user: PropTypes.object,
};

Layout.defaultProps = {
	user: null,
};

export default Layout;
