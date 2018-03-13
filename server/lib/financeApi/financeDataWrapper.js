
const fetch = (financeDataFetcher, filter) => function () {
   return financeDataFetcher
      .then(response => {
         return filter(response);
      });
};

const create = ({ financeDataFetcher, filter }) => {
   if (!(financeDataFetcher.then instanceof Function)) {
      throw new Error("the finance data wrapper needs a promise as finance data fetcher.");
   }
   if (!(filter instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as filter.");
   }

   return Object.freeze({
      fetch: fetch(financeDataFetcher, filter)
   });
};

export {
   create
};