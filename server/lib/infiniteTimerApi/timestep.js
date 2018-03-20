import propOrDefault from './../helper/propOrDefault';

const _handleExecutionResult = function (executionOutput, resolve) {
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

const create = (properties) => {
   const _stepExecution = propOrDefault(properties, "stepExecution", null);
   if (!(_stepExecution.then instanceof Function)) {
      throw new Error("the timestep did not get a promise for step execution");
   }
   const _timeInterval = propOrDefault(properties, "timeInterval", null);
   const _timeoutHandler = propOrDefault(properties, "timeoutHandler", setTimeout);

   return Object.freeze({
      execute() {
         return new Promise((resolve, reject) => {
            _timeoutHandler(() => {
               _stepExecution
                  .then(executionOutput => _handleExecutionResult(executionOutput, resolve))
                  .catch(reject);
            }, _timeInterval);
         });
      }
   });
};

export {
   create,
};