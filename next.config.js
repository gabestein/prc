const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const dotenv = require('dotenv');

dotenv.config();

module.exports = withPlugins(
	[
		[
			withSass,
			{
				cssLoaderOptions: {
					url: false,
				},
			},
		],
	],
	{
		target: 'serverless',
		env: {
			GRAPHQL_URI: process.env.GRAPHQL_URI,
			PLAID_PUBLIC_KEY: process.env.PLAID_PUBLIC_KEY,
			APP_URI: process.env.APP_URI,
		},
	},
);
