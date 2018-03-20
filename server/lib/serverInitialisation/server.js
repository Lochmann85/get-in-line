/**
 * @module server
 * initialises all needed app parts:
 *  1. build graphql schema with needed mongo db services
 *  2. initialises and starts web server (http and ws server)
 */
import propOrDefault from './../helper/propOrDefault';

import * as schemaBuilderFactory from './../graphQLApi/schemaBuilder';
import * as graphQLAppFactory from './graphQLApp';

const create = (properties) => {
   const _schemaBuilderFactory = propOrDefault(properties, "schemaBuilderFactory", schemaBuilderFactory);
   const _graphQLAppFactory = propOrDefault(properties, "graphQLAppFactory", graphQLAppFactory);

   const _schemaBuilder = _schemaBuilderFactory.create();
   const _graphQLApp = _graphQLAppFactory.create();

   return Object.freeze({
      initialise() {
         return _schemaBuilder.build({})
            .then(executableSchema => {
               return _graphQLApp.startGraphQLWebserver(executableSchema);
            });
      }
   });
};

export {
   create
};