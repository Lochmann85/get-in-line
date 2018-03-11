
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

const execute = ({ stepExecution, timeInterval, timeoutHandler }) => function () {
   return new Promise((resolve, reject) => {
      timeoutHandler(() => {
         stepExecution
            .then(output => handleExecutionResult(output, resolve))
            .catch(reject);
      }, timeInterval);
   });
};

const create = (privateParameters) => {
   const { stepExecution } = privateParameters;

   if (!(stepExecution.then instanceof Function)) {
      throw new Error("the timestep did not get a promise for step execution");
   }

   if (!privateParameters.timeoutHandler) {
      privateParameters.timeoutHandler = setTimeout;
   }

   return Object.freeze({
      execute: execute(privateParameters)
   });
};

export {
   create,
};