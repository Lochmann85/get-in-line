
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
      if (stepExecution.then instanceof Function) {
         timeoutHandler(() => {
            stepExecution
               .then(output => handleExecutionResult(output, resolve))
               .catch(reject);
         }, timeInterval);
      }
      else {
         reject(new Error("the timestep did not get a Promise"));
      }
   });
};

const create = (privateParameters) => {
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