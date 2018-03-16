
const fetch = (financeDataFetcher, filter, nameResponse) => function (company) {
   const fetchPromise = financeDataFetcher(company);

   if (!(fetchPromise.then instanceof Function)) {
      return Promise.reject(new Error("the financeDataFetcher has to return a Promise"));
   }

   return fetchPromise
      .then(response => {
         return nameResponse(filter(response));
      });
};

const canFetchFinanceData = ({ financeDataFetcher, filter, nameResponse }) => {
   if (!(financeDataFetcher instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as finance data fetcher.");
   }
   if (!(filter instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as filter.");
   }
   if (!(nameResponse instanceof Function)) {
      throw new Error("the finance data wrapper needs a function as nameResponse.");
   }

   return Object.freeze({
      fetch: fetch(financeDataFetcher, filter, nameResponse)
   });
};

export default canFetchFinanceData;