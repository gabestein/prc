# Setup
1. Get now account
1. Setup auth0
1. Setup hasura (admin, jwt, etc.)
1. Env config
1. Deploy to prod
1. Run

# Deploy
1. configure `now.json` and `.env` with right variables
1. `npm install --save now`
1. `now add secrets auth0_client_secret <SECRET>`
1. `now add secrets session_cookie_secret <SECRET>`
1. `npm deploy` for dev
1. `npm deploy:prod` for prod

# DB setup
1. configure `db/config.yaml` with right variables
1. run `npx hasura migrate apply`
1. run `npx hasura console` to make further changes, which will be saved as migrations as long as made through that interface

# Some setup sources
https://github.com/auth0/nextjs-auth0
https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/
https://medium.com/@tomanagle/create-a-server-side-rendering-graphql-client-with-next-js-and-apollo-client-acd397f70c64
https://github.com/ZEIT/next.js/tree/canary/examples/auth0
https://deploy-preview-3095--hasura-docs.netlify.com/graphql/manual/migrations/existing-database.html#step-0-disable-console-on-the-server
https://docs.hasura.io/1.0/graphql/manual/getting-started/heroku-simple.html
https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-through-npm
https://docs.hasura.io/1.0/graphql/manual/migrations/new-database.html
https://docs.hasura.io/1.0/graphql/manual/auth/authentication/webhook.html
https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html
