const { exec } = require('child_process');

exec(
	`npx hasura migrate apply --endpoint ${process.env.HASURA_URI} --admin-secret ${process.env.HASURA_ADMIN_SECRET}`,
	(error, stdout, stderr) => {
		console.log(error, stdout, stderr);
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	},
);
