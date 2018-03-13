
const handleExecutionResult = (executionOutput, resolve) => {
   if (executionOutput.hasOwnProperty("result") &&
      executionOutput.hasOwnProperty("shouldContinue")) {
      resolve(executionOutput);
   }
   else {
      resolve({
         shouldContinue: true,
         result: executionOutput
      });
   }
};

const execute = (stepExecution, timeInterval, timeoutHandler) => function () {
   return new Promise((resolve, reject) => {
      timeoutHandler(() => {
         stepExecution
            .then(executionOutput => handleExecutionResult(executionOutput, resolve))
            .catch(reject);
      }, timeInterval);
   });
};

const create = ({ stepExecution, timeInterval, timeoutHandler }) => {
   if (!(stepExecution.then instanceof Function)) {
      throw new Error("the timestep did not get a promise for step execution");
   }

   let _timeoutHandler = timeoutHandler;
   if (!_timeoutHandler) {
      _timeoutHandler = setTimeout;
   }

   return Object.freeze({
      execute: execute(stepExecution, timeInterval, _timeoutHandler)
   });
};

export {
   create,
};