
const start = ({ timestep }) => function () {
   return timestep.execute().then(() => {
      return this.start();
   });
};

const create = (privateParameters) => Object.freeze({
   start: start(privateParameters)
});

export {
   create
};