import { initApolloClient } from '../../utils/apollo-client';
import SINGLE_WORK_QUERY from '../../graphql/works.query';
import WORKS_UPSERT from '../../graphql/works.mutation';
import Crossref from '../../utils/crossref';
import { flattenCrossrefMessage } from '../../utils/helpers';

const crossref = new Crossref();
let auth0Token;

async function getAuth0Token() {
	if (auth0Token) {
		return auth0Token;
	}
	const auth0Res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
		method: 'post',
		body: JSON.stringify({
			grant_type: 'client_credentials',
			audience: `${process.env.API_URI || process.env.BASE_URI}`,
			client_id: process.env.AUTH0_CLIENT_ID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
		}),
		headers: { 'Content-Type': 'application/json' },
	});
	const json = await auth0Res.json();
	auth0Token = json.access_token;
	return auth0Token;
}

export default async function getReviews(req, res) {
	try {
		const token = await getAuth0Token();
		const doi = req.query.doi;
		const apolloClient = initApolloClient({ req, res }, {}, token);
		apolloClient
			.query({ query: SINGLE_WORK_QUERY, variables: { doi: doi.toLowerCase() } })
			.then(async ({ data: { works } }) => {
				if (works.length === 0) {
					const work = await crossref.works(doi);
					const reviews = await crossref.reviews(doi);
					const flattenedWork = flattenCrossrefMessage(work.message);
					const flattenedRelations = reviews.message.items.map((review) => {
						return {
							relation_type: 'review',
							child: {
								data: flattenCrossrefMessage(review),
							},
						};
					});
					flattenedWork.children = { data: flattenedRelations };
					console.log(flattenedWork);
					apolloClient.mutate({
						mutation: WORKS_UPSERT,
						variables: {
							worksInput: [flattenedWork],
						},
					});
				}
				res.status(200).send('ok');
			});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
