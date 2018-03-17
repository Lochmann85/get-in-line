import yahooFinance from 'yahoo-finance';
import moment from 'moment';

import canFetchFinanceData from './../canFetchFinanceData';
import { defaultNameResponse } from './../responseNamer';
import { defaultFilter } from './../filter';

const yahooDividendFetcher = ({ responseProperty, yahooFinanceApi }) => {
   let _yahooFinanceApi = yahooFinanceApi;
   if (!_yahooFinanceApi) {
      _yahooFinanceApi = yahooFinance;
   }

   const yahooDividend = (company) => new Promise((resolve, reject) => {
      const startOfYear = moment().startOf('year').subtract(1, "year");
      const today = moment();

      _yahooFinanceApi.historical({
         symbol: company.yahooSymbol,
         from: startOfYear.toDate(),
         to: today.toDate(),
         period: "v"
      }, (error, quotes) => {
         if (!error) {
            resolve(quotes);
         }
         else {
            reject(error);
         }
      });
   });

   return Object.assign({}, canFetchFinanceData({
      financeDataFetcher: yahooDividend,
      filter: defaultFilter,
      nameResponse: defaultNameResponse(responseProperty)
   }));
};

export default yahooDividendFetcher;