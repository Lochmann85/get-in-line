
const start = ({ timestep }) => function () {
   return timestep.execute().then(({ shouldContinue, result }) => {
      if (shouldContinue) {
         return this.start();
      }
      else {
         return result;
      }
   });
};

const create = (privateParameters) => Object.freeze({
   start: start(privateParameters)
});

export {
   create
};