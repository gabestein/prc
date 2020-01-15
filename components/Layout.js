import PropTypes from 'prop-types';

import Header from './Header';
import './base.scss';

const Layout = (props) => (
	<div>
		<Header />
		{props.children}
	</div>
);

Layout.propTypes = {
	children: PropTypes.array.isRequired,
};

export default Layout;
