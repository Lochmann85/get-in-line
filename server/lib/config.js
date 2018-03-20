/**
 * @module config
 * loads the json-configuration files and the environment variables
 * calculates the server port depending on the node environment
 * when in production the port is 3000 else 3001 (needed for client port forwarding)
 */
import dotenv from 'dotenv';

import propOrDefault from './helper/propOrDefault';

const create = ({ processApi }) => {
   const _processApi = propOrDefault(processApi, process);

   dotenv.config({ silent: true });

   const config = Object.assign({}, _processApi.env);

   // Express only serves static assets in production
   config.isInProductionMode = config.NODE_ENV === "production";
   config.SERVER_PORT = config.isInProductionMode ? 3000 : 3001;

   return Object.freeze(config);
};

const config = create({});

export {
   create,
   config
};