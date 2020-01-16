# Deploy
1. configure now.json with right variables
1. `npm install --save now`
1. `now add secrets auth0_client_secret <SECRET>`
1. `now add secrets session_cookie_secret <SECRET>`
1. `npm deploy` for dev
1. `npm deploy:prod` for prod

# Some setup sources
https://github.com/auth0/nextjs-auth0
https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/
https://medium.com/@tomanagle/create-a-server-side-rendering-graphql-client-with-next-js-and-apollo-client-acd397f70c64
https://github.com/ZEIT/next.js/tree/canary/examples/auth0
https://deploy-preview-3095--hasura-docs.netlify.com/graphql/manual/migrations/existing-database.html#step-0-disable-console-on-the-server
https://docs.hasura.io/1.0/graphql/manual/getting-started/heroku-simple.html
https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-through-npm
