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
         .then(output => {
            output.should.equal(expectedOutput);
            done();
         })
         .catch(done);
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

   it("should reject with error when timestep input is not a promise", (done) => {
      const expectedOutput = "function is not possible";

      const singleTimestep = timestep.create({
         stepExecution: () => expectedOutput,
         timeInterval
      });

      singleTimestep.execute()
         .then(output => done("Should not come here because a function is given"))
         .catch(error => {
            done();
         });
   });

   it("should wait for a given time before executing the step", (done) => {
      const expectedTimeInterval = 3000,
         expectedOutput = "promise is resolved after a certain time";

      const singleTimestep = timestep.create({
         stepExecution: Promise.resolve(expectedOutput),
         timeInterval: expectedTimeInterval,
         timeoutHandler: (callback, timeInterval) => {
            timeInterval.should.equal(expectedTimeInterval);

            callback();
         }
      });

      singleTimestep.execute()
         .then(output => {
            output.should.equal(expectedOutput);
            done();
         })
         .catch(done);
   });
});