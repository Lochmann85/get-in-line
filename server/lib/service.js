/**
 * @module service
 * loads the configuration and starts the server
 * initial entry point for app
 */

import * as serverFactory from './serverInitialisation/server';

const server = serverFactory.create();

server.initialise()
   .then(() => { })
   .catch(error => console.log(error));