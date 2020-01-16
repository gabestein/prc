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
	},
);
