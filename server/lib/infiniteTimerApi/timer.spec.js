import * as infiniteTimer from './timer';

describe("infinite timer", () => {

   it("should start the timestep once", (done) => {
      const mockedTimestep = {
         execute: () => { done(); }
      };

      const timer = infiniteTimer.create({
         timestep: mockedTimestep
      });

      timer.start()
         .then(() => done("should not come here, because done is called in the mocked timestep"))
         .catch(done);
   });

   it("should execute the timestep twice", (done) => {
      let timestepExecutions = 0;

      const mockedTimestep = {
         execute: () => {
            ++timestepExecutions;

            if (timestepExecutions === 2) {
               return Promise.resolve({
                  result: timestepExecutions,
                  shouldContinue: false
               });
            }
            else {
               return Promise.resolve({
                  shouldContinue: true
               });
            }
         }
      };

      const timer = infiniteTimer.create({
         timestep: mockedTimestep
      });

      timer.start()
         .then(result => {
            result.should.equal(2);
            done();
         })
         .catch(done);
   });
});