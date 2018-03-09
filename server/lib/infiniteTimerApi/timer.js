
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

const create = ({ timestep }) => Object.freeze({
   start: start({ timestep })
});

export {
   create
};