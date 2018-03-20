/**
 * @module wsGraphQL
 * starts the http server with the express graphql app,
 * adds the graphql subscription which internally adds the websocket server
 */

import { execute, subscribe } from 'graphql';
import http from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { config } from './../config';

const initialiseGraphQlSubscription = (executableSchema, graphQLApp) => {
   return new Promise((resolve, reject) => {
      const httpServer = http.createServer(graphQLApp);

      httpServer.on("error", () => {
         // exit after finishing all I/O operations
         setImmediate(() => process.exit(1));
      });

      SubscriptionServer.create(
         {
            schema: executableSchema,
            subscribe: subscribe,
            execute: execute
         },
         {
            server: httpServer,
            path: "/subscription",
         },
      );

      console.log(`Websocket serves on ws://localhost:${config.SERVER_PORT}/subscription`); // eslint-disable-line no-console

      resolve(httpServer);
   });
};

export {
   initialiseGraphQlSubscription
};