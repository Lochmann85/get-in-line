
const fetch = (financeDataFetcher, filter, responseNamer) => function (company) {
   const fetchPromise = financeDataFetcher(company);

   if (!(fetchPromise.then instanceof Function)) {
      return Promise.reject(new Error("the financeDataFetcher has to return a Promise"));
   }

   return fetchPromise
      .then(response => {
         return responseNamer(filter(response));
      });
};

const canFetchFinanceData = ({ financeDataFetcher, filter, responseNamer }) => {
   if (!(financeDataFetcher instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as finance data fetcher.");
   }
   if (!(filter instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as filter.");
   }
   if (!(responseNamer instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as responseNamer.");
   }

   return Object.freeze({
      fetch: fetch(financeDataFetcher, filter, responseNamer)
   });
};

export default canFetchFinanceData;