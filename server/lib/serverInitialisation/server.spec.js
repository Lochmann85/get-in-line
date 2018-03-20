import * as server from './server';

describe("server initialisation", () => {

   it("should build the graphql schema and initialize all servers", (done) => {
      let buildVisited = false,
         graphQLAppVisited = false;

      server.initialise({
         schemaBuilder: {
            build() {
               buildVisited = true;
               return Promise.resolve();
            }
         },
         graphQLApp: {
            startGraphQLWebserver() {
               graphQLAppVisited = true;
               return Promise.resolve();
            }
         },
      })
         .then(() => {
            buildVisited.should.be.true; // eslint-disable-line no-unused-expressions
            graphQLAppVisited.should.be.true; // eslint-disable-line no-unused-expressions

            done();
         }).catch(done);
   });

});