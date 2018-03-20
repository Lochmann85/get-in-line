/**
 * @module graphQLApp
 * initialises the http graph ql routing and the ws graphql subscriptions
 * starts the graphql webserver
 */
import { config } from './../config';
import propOrDefault from './../helper/propOrDefault';

import * as httpGraphQLFactory from './../graphQLApi/httpGraphQL';
import * as wsGraphQLFactory from './../graphQLApi/wsGraphQL';

const create = (properties) => {
   const _httpGraphQLFactory = propOrDefault(properties, "httpGraphQLFactory", httpGraphQLFactory);
   const _wsGraphQLFactory = propOrDefault(properties, "wsGraphQLFactory", wsGraphQLFactory);

   return Object.freeze({
      startGraphQLWebserver(executableSchema) {
         return _httpGraphQLFactory.initialiseGraphQLRouting(executableSchema)
            .then(graphQLApp => {
               return _wsGraphQLFactory.initialiseGraphQlSubscription(executableSchema, graphQLApp);
            })
            .then(webServer => {
               webServer.listen(config.SERVER_PORT, () => {
                  console.log(`Webserver running`); // eslint-disable-line no-console

                  return Promise.resolve();
               });
            });
      }
   });
};

export {
   create
};