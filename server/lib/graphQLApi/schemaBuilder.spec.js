import * as schemaBuilder from './schemaBuilder';

describe("graphQL schema building", () => {

   it("should fill the template with types, queries, mutations, subscriptions", (done) => {
      const mockedGraphQLServices = {
         create() {
            return [{
               types: "type testType { test: String }",
               queries: "testQuery: String",
               mutations: "testMutation: String",
               subscriptions: "testSubscription: String",
               addResolvers: () => { }
            }];
         }
      };

      schemaBuilder.build({ graphQLServices: mockedGraphQLServices }).then(executableSchema => {

         executableSchema.should.include.keys([
            "_directives",
            "_implementations",
            "_mutationType",
            "_queryType",
            "_subscriptionType",
            "_typeMap",
            "astNode",
         ]);
         done();
      }).catch(done);
   });

   it("calls addResolvers for every graphQL service", (done) => {
      let counter = 0,
         raiseCounter = () => ++counter,
         mockedGraphQLServices = {
            create() {
               return [
                  { addResolvers: () => raiseCounter() },
                  { addResolvers: () => raiseCounter() },
                  { addResolvers: () => raiseCounter() },
               ];
            }
         },
         mockedSchemaTemplate = { fill: () => `type Query {test:String}` };

      schemaBuilder.build({
         graphQLServices: mockedGraphQLServices,
         schemaTemplate: mockedSchemaTemplate
      }).then(executableSchema => {
         counter.should.equal(3);
         done();
      }).catch(done);
   });
});