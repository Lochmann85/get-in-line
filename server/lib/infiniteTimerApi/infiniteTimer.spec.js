import * as infiniteTimer from './infiniteTimer';

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
               done();
               return Promise.reject(null);
            }
            else {
               return Promise.resolve();
            }
         }
      };

      const timer = infiniteTimer.create({
         timestep: mockedTimestep
      });

      timer.start()
         .then(() => done("should not come here, because done is called in the mocked timestep"))
         .catch(error => {
            // added null as reject inside mocked timestep to stop timer
            if (error) {
               done(error);
            }
         });
   });
});