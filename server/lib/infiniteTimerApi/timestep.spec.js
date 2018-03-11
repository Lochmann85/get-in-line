import * as timestep from './timestep';

const timeInterval = 100;

describe("infinite timer timestemp", () => {

   it("should make a timestep and handle a promise", (done) => {
      const expectedOutput = "promise is resolved";

      const singleTimestep = timestep.create({
         stepExecution: Promise.resolve(expectedOutput),
         timeInterval
      });

      singleTimestep.execute()
         .then(({ shouldContinue, result }) => {
            result.should.equal(expectedOutput);
            shouldContinue.should.be.true; // eslint-disable-line no-unused-expressions

            done();
         })
         .catch(done);
   });

   it("should throw error when timestep input is not a promise", (done) => {
      try {
         timestep.create({
            stepExecution: () => "error",
            timeInterval
         });
      }
      catch (error) {
         done();
      }
   });

   it("should make a timestep and reject if the promise is rejected", (done) => {
      const expectedOutput = "promise is rejected with error",
         mockedPromise = {
            then: () => ({ catch: (reject) => reject(expectedOutput) })
         };

      const singleTimestep = timestep.create({
         stepExecution: mockedPromise,
         timeInterval,
      });

      singleTimestep.execute()
         .then(output => done("Should not come here because the promise is rejected"))
         .catch(error => {
            error.should.equal(expectedOutput);
            done();
         });
   });

   it("should wait for a given time before executing the step", (done) => {
      const expectedTimeInterval = 3000,
         expectedOutput = "promise is resolved after a certain time";

      const singleTimestep = timestep.create({
         stepExecution: Promise.resolve({
            shouldContinue: false,
            result: expectedOutput
         }),
         timeInterval: expectedTimeInterval,
         timeoutHandler: (callback, timeInterval) => {
            timeInterval.should.equal(expectedTimeInterval);

            callback();
         }
      });

      singleTimestep.execute()
         .then(({ shouldContinue, result }) => {
            result.should.equal(expectedOutput);
            shouldContinue.should.be.false; // eslint-disable-line no-unused-expressions

            done();
         })
         .catch(done);
   });
});