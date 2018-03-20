const appIp = process.env.NODE_ENV === "production" ? process.env.REACT_APP_IP : "localhost";
const appPort = 3000;
const websocketPort = process.env.NODE_ENV === "production" ? 3000 : 3001;

const httpUri = `http://${appIp}:${appPort}/graphql`;
const webSocketUri = `ws://${appIp}:${websocketPort}/subscription`;

export {
   appIp,
   appPort,
   httpUri,
   websocketPort,
   webSocketUri
};