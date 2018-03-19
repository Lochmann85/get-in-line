/**
 * @module graphQLApp
 * initialises the http graph ql routing and the ws graphql subscriptions
 * starts the graphql webserver
 */
import { config } from './../config';

import * as httpGraphQLApi from './../graphQLApi/httpGraphQL';
import * as wsGraphQLApi from './../graphQLApi/wsGraphQL';

const startGraphQLWebserver = (executableSchema) => {
   return httpGraphQLApi.initialiseGraphQLRouting(executableSchema)
      .then(graphQLApp => {
         return wsGraphQLApi.initialiseGraphQlSubscription(executableSchema, graphQLApp);
      })
      .then(webServer => {
         webServer.listen(config.SERVER_PORT, () => {
            console.log(`Webserver running`); // eslint-disable-line no-console

            return Promise.resolve();
         });
      });
};

export {
   startGraphQLWebserver
};