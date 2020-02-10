# Setup
1. Get now account
1. Setup auth0
1. Setup hasura (admin, jwt, etc.)
1. Env config
1. Deploy to prod
1. Run

## Auth0 Setup (One Per Environment)
1. New tenant
1. Edit default app
1. App type: `Regular Web Application`
1. Token Endpoint Auth Method: `Post`
1. Callback urls: `http://localhost:3000/api/callback,https://your-env-domain/api/callback`
1. Web origins: `http://localhost:3000,https://your-env-domain`
1. Logout URLs: `http://localhost:3000/logout,https://your-env-domain/logout`
1. Advanced -> Grant Types -> Make sure client credentials is enabled.
1. Create new API
1. Identifier = https://your-env-domain
1. Machine-to-Machine Applications: de-auth the new test app it created, auth the app you edited above. Test using curl.
1. Create new rule called 'Hasura JWT Claims':
```
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.idToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```
1. Create another new rule called 'Hasura User Creation':
```
function (user, context, callback) {
  const userId = user.user_id;
  const hasuraAdminSecret = configuration.HASURA_GRAPHQL_ADMIN_SECRET;
  const url = configuration.HASURA_GRAPHQL_URI;
  const upsertUserQuery = `
    mutation($userId: String!){
      insert_users(objects: [{ user_id: $userId }], on_conflict: { constraint: users_pkey, update_columns: [] }) {
        affected_rows
      }
    }`;
  const graphqlReq = { "query": upsertUserQuery, "variables": { "userId": userId } };

  request.post({
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': hasuraAdminSecret},
      url:   url,
      body:  JSON.stringify(graphqlReq)
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
```
1. Add dev key called `HASURA_GRAPHQL_URI` with value of the full domain to your endpoint (IE: `https://your-domain/v1/graphql`)
1. Add dev key called `HASURA_GRAPHQL_ADMIN_SECRET` with the admin secret for that environment.
1. Create hook called `hasura-credentials-hook` and enter:
```
/**
@param {object} client - information about the client
@param {string} client.name - name of client
@param {string} client.id - client id
@param {string} client.tenant - Auth0 tenant name
@param {object} client.metadata - client metadata
@param {array|undefined} scope - array of strings representing the scope claim or undefined
@param {string} audience - token's audience claim
@param {object} context - additional authorization context
@param {object} context.webtask - webtask context
@param {function} cb - function (error, accessTokenClaims)
*/
module.exports = function(client, scope, audience, context, cb) {
  var access_token = {};
  const namespace = "https://hasura.io/jwt/claims";
  access_token[namespace] = {
      'x-hasura-default-role': 'api',
      'x-hasura-allowed-roles': ['api'],
  }

  cb(null, access_token);
};
```
1. Visit https://hasura.io/jwt-config and use your auth0 environment domain (ie: `domain.auth0.com`) to generate a JWT config
1. Add it to the right place in Heroku and/or Docker depending on how you're hosting your hasura instance

# DB setup
1. configure `db/config.yaml` with right variables
1. run `npx hasura migrate apply`
1. run `npx hasura console` to make further changes, which will be saved as migrations as long as made through that interface

# Deploy
1. configure `now.json`, `.env`, `.env.build`, `.env.sandbox`, etc. with right variables
1. `npm install --save now`
1. `now add secrets secret_name <SECRET>` for everything in now.json and now.sandbox.json
1. `now add secrets session_cookie_secret <SECRET>`
1. `npm deploy:dev` for dev
1. `npm deploy:sandbox` for dev
1. `npm deploy:prod` for prod

# DB changes
1. Always run `npm run console` to get sandbox db console up
1. Run `npm run migrate:dev` to migrate changes to dev

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
https://auth0.com/docs/api-auth/tutorials/client-credentials
https://auth0.com/docs/dashboard/guides/applications/update-grant-types
https://auth0.com/docs/api-auth/config/using-the-auth0-dashboard
https://auth0.com/docs/api-auth/tutorials/client-credentials/customize-with-hooks
