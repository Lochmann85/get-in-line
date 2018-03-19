/**
 * @module service
 * loads the configuration and starts the server
 * initial entry point for app
 */

import * as server from './serverInitialisation/server';

server.initialise({})
   .then(() => { })
   .catch(error => console.log(error));