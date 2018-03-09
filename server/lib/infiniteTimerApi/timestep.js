
const execute = ({ stepExecution, timeoutHandler, timeInterval }) => function () {
   return new Promise((resolve, reject) => {
      if (stepExecution.then instanceof Function) {
         timeoutHandler(() => {
            stepExecution
               .then(resolve)
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