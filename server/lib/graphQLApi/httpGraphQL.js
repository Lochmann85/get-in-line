/**
 * @module httpGraphQL
 * sets up the single express "/graphql" route for resolving the graphql requests
 */

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import path from 'path';

import { config } from './../config';

const _reactAppDirectory = path.join(__dirname, "..", "..", "..", "client", "build");

const initialiseGraphQLRouting = (executableSchema) => {
   return new Promise((resolve, reject) => {
      const httpGraphQL = express();

      httpGraphQL.use("/graphql",
         bodyParser.json(),
         bodyParser.urlencoded({ extended: false }),
         graphqlExpress(request => ({ schema: executableSchema }))
      );

      // Express only serves static assets in production
      if (config.isInProductionMode) {
         httpGraphQL.use(express.static(_reactAppDirectory));
      }
      else {
         httpGraphQL.use(
            "/graphql_dev",
            bodyParser.json(),
            graphqlExpress(request => ({ schema: executableSchema }))
         );

         httpGraphQL.use("/graphiql", graphiqlExpress({
            endpointURL: "/graphql_dev",
         }));
      }

      console.log(`GraphQL serves on http://localhost:${config.SERVER_PORT}/graphql`);

      resolve(httpGraphQL);
   });
};

export {
   initialiseGraphQLRouting
};