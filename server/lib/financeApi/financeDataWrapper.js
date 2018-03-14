
const fetch = (financeDataFetcher, filter) => function (company) {
   const fetchPromise = financeDataFetcher(company);

   if (!(fetchPromise.then instanceof Function)) {
      return Promise.reject(new Error("the financeDataFetcher has to return a Promise"));
   }

   return fetchPromise.then(response => {
      return filter(response);
   });
};

const create = ({ financeDataFetcher, filter }) => {
   if (!(financeDataFetcher instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as finance data fetcher.");
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