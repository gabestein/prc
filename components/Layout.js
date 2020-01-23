import PropTypes from 'prop-types';
import Header from './Header';
import './base.scss';
import UserContext from '../utils/user';

const Layout = (props) => (
	<UserContext.Provider value={props.user}>
		<div>
			<Header />
			{props.children}
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
