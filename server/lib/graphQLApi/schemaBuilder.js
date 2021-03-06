/**
 * @module schemaBuilder
 * initialises all graphql services
 * fills the schema template with the service definitions
 * builds the executable schema from the resolvers in the services
 */

import { makeExecutableSchema } from 'graphql-tools';

import propOrDefault from './../helper/propOrDefault';
import * as graphQLServicesApi from './services/graphQLServices';
import * as schemaTemplateApi from './schemaTemplate';

const create = (properties) => {
   const _graphQLServices = propOrDefault(properties, "graphQLServices", graphQLServicesApi);
   const _schemaTemplate = propOrDefault(properties, "schemaTemplate", schemaTemplateApi);

   const _buildExecutableSchema = (allGraphQLServices, typeDefinitions) => {
      const executableSchema = makeExecutableSchema({
         typeDefs: [typeDefinitions],
      });

      allGraphQLServices.forEach(graphQLService => {
         graphQLService.addResolvers(executableSchema);
      });

      return executableSchema;
   };

   return Object.freeze({
      build() {
         return new Promise((resolve, reject) => {
            const allGraphQLServices = _graphQLServices.create();

            const typeDefinitions = _schemaTemplate.fill(allGraphQLServices);

            resolve(_buildExecutableSchema(allGraphQLServices, typeDefinitions));
         });
      }
   });
};

export {
   create
};