import propOrDefault from './../helper/propOrDefault';

const create = (properties) => {
   const _timestep = propOrDefault(properties, "timestep", null);

   return Object.freeze({
      start() {
         return _timestep.execute().then(({ shouldContinue, result }) => {
            if (shouldContinue) {
               return this.start();
            }
            else {
               return result;
            }
         });
      }
   });
};

export {
   create
};