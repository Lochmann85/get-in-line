import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
   httpUri,
   webSocketUri
} from './../config';
import browserHistory from './routerHistory';

const errorLink = onError(({ networkError, graphQLErrors }) => {
   if (graphQLErrors) {
      browserHistory.push("/error", { errors: graphQLErrors });
   }
   else if (networkError) {
      browserHistory.push("/error", { errors: networkError });
   };
});

const httpLink = new HttpLink({
   uri: httpUri
});

const httpLinkWithErrorHandling = ApolloLink.from([
   errorLink,
   httpLink,
]);

const wsLink = new WebSocketLink({
   uri: webSocketUri,
   options: {
      reconnect: true
   }
});

const wsLinkWithErrorHandling = ApolloLink.from([
   errorLink,
   wsLink,
]);

const link = split(
   ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
   },
   wsLinkWithErrorHandling,
   httpLinkWithErrorHandling,
);

const cache = new InMemoryCache({
   dataIdFromObject: object => `${object.__typename}_${object.id}`,
});

const apolloClient = new ApolloClient({
   link,
   cache,
});

export default apolloClient;