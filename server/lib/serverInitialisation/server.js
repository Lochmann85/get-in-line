/**
 * @module server
 * initialises all needed app parts:
 *  1. build graphql schema with needed mongo db services
 *  2. initialises and starts web server (http and ws server)
 */
import propOrDefault from './../helper/propOrDefault';

import * as schemaBuilderApi from './../graphQLApi/schemaBuilder';
import * as graphQLAppApi from './graphQLApp';

const initialise = ({ schemaBuilder, graphQLApp }) => {
   const _schemaBuilder = propOrDefault(schemaBuilder, schemaBuilderApi);
   const _graphQLApp = propOrDefault(graphQLApp, graphQLAppApi);

   return _schemaBuilder.build({})
      .then(executableSchema => {
         return _graphQLApp.startGraphQLWebserver(executableSchema);
      });
};

export {
   initialise
};