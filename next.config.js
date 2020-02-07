const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const dotenv = require('dotenv-flow');

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
			APP_URI: process.env.BASE_URI,
			API_URI: process.env.API_URI || process.env.BASE_URI,
			PLAID_WEBHOOK_KEY: process.env.PLAID_WEBHOOK_KEY,
			PLAID_ENV: process.env.PLAID_ENV,
		},
	},
);
