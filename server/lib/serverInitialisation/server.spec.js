import * as serverFactory from './server';

describe("server initialisation", () => {

   it("should build the graphql schema and initialize all servers", (done) => {
      let buildVisited = false,
         graphQLAppVisited = false;

      const serverInstance = serverFactory.create({
         schemaBuilderFactory: {
            create: () => ({
               build() {
                  buildVisited = true;
                  return Promise.resolve();
               }
            })
         },
         graphQLAppFactory: {
            create: () => ({
               startGraphQLWebserver() {
                  graphQLAppVisited = true;
                  return Promise.resolve();
               }
            })
         }
      });

      serverInstance.initialise().then(() => {
         buildVisited.should.be.true; // eslint-disable-line no-unused-expressions
         graphQLAppVisited.should.be.true; // eslint-disable-line no-unused-expressions

         done();
      }).catch(done);
   });

});