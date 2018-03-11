
const fetch = ({ financeDataFetcher }) => function () {
   return financeDataFetcher;
};

const create = (privateParameters) => {
   const { financeDataFetcher } = privateParameters;

   if (!(financeDataFetcher.then instanceof Function)) {
      throw new Error("the finance data wrapper needs a promise as finance data fetcher.");
   }

   return Object.freeze({
      fetch: fetch(privateParameters)
   });
};

export {
   create
};