import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';

const Post = (props) => (
	<Layout>
		<h1>{props.show.name}</h1>
		<p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
		{props.show.image ? <img src={props.show.image.medium} alt={`${props.show.name}`} /> : null}
	</Layout>
);

Post.getInitialProps = async function(context) {
	const { id } = context.query;
	const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
	const show = await res.json();

	return { show };
};

Post.propTypes = {
	show: PropTypes.object.isRequired,
};

export default Post;
