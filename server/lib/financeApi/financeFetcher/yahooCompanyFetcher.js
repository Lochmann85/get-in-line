import yahooFinance from 'yahoo-finance';

import canFetchFinanceData from './../canFetchFinanceData';
import { defaultNameResponse } from './../responseNamer';

const yahooCompanyFetcher = ({ responseProperty, yahooFinanceApi }) => {
   let _yahooFinanceApi = yahooFinanceApi;
   if (!_yahooFinanceApi) {
      _yahooFinanceApi = yahooFinance;
   }

   const yahooCompany = (company) => new Promise((resolve, reject) => {
      _yahooFinanceApi.quote({
         symbol: company.yahooSymbol,
         modules: ["summaryDetail", "defaultKeyStatistics"]
      }, function (error, quotes) {
         if (!error) {
            resolve(quotes);
         }
         else {
            reject(error);
         }
      });
   });

   return Object.assign({}, canFetchFinanceData({
      financeDataFetcher: yahooCompany,
      filter: (response) => ({
         lastDividendRate: response.summaryDetail.dividendRate,
         lastDividendYield: response.summaryDetail.dividendYield,
         lastDividendDate: response.summaryDetail.exDividendDate,
         fiveYearAvgDividendYield: response.summaryDetail.fiveYearAvgDividendYield,
         trailingPriceToEarnings: response.summaryDetail.trailingPE,
         trailingEarningsPerShare: response.defaultKeyStatistics.trailingEps,
         currency: response.summaryDetail.currency
      }),
      nameResponse: defaultNameResponse(responseProperty)
   }));
};

export default yahooCompanyFetcher;