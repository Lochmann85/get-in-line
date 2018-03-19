import * as config from './config';

describe(".env configuration setup", () => {
   const mockedProcess = {
      env: {
         NODE_ENV: "production"
      }
   };

   it("should load the .env file", () => {
      const configuration = config.create({});

      configuration.should.include.keys([
         "NODE_ENV",
         "isInProductionMode",
         "SERVER_PORT",
      ]);
   });

   it("should set the port to 3000 when in production mode", () => {
      const configuration = config.create({ processApi: mockedProcess });

      configuration.isInProductionMode.should.be.true; // eslint-disable-line no-unused-expressions
      configuration.SERVER_PORT.should.equal(3000);
   });

   it("should set the port to 3001 when in development mode", () => {
      mockedProcess.env.NODE_ENV = "development";

      const configuration = config.create({ processApi: mockedProcess });

      configuration.isInProductionMode.should.be.false; // eslint-disable-line no-unused-expressions
      configuration.SERVER_PORT.should.equal(3001);
   });

});