const _schemaTemplate = (types, queries, mutations, subscriptions) => `
${types}
type Query {
   ${queries}
   test: String
}
${mutations ? `type Mutation {
   ${mutations}
}` : ""}
${subscriptions ? `type Subscription {
   ${subscriptions}
}` : ""}
schema {
   query: Query
   ${mutations ? "mutation: Mutation" : ""}
   ${subscriptions ? "subscription: Subscription" : ""}
}
`;

const fill = (graphQLServices) => {
   let types = "",
      queries = "",
      mutations = "",
      subscriptions = "";

   graphQLServices.forEach(graphQLService => {
      if (graphQLService.queries && 0 !== graphQLService.queries.length) {
         queries += graphQLService.queries;
      }
      else {
         throw new Error(`Query is the minimum for the graphQL service ${graphQLService.name}.`);
      }
      if (graphQLService.types) {
         types += graphQLService.types;
      }
      if (graphQLService.mutations) {
         mutations += graphQLService.mutations;
      }
      if (graphQLService.subscriptions) {
         subscriptions += graphQLService.subscriptions;
      }
   });

   return _schemaTemplate(types, queries, mutations, subscriptions);
};

export {
   fill
};