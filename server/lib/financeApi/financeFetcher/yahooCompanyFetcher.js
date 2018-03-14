import yahooFinance from 'yahoo-finance';

import * as financeDataWrapper from './../financeDataWrapper';

const yahooCompanyFetcher = ({ responseProperty }) => {
   const yahooCompany = (company) => new Promise((resolve, reject) => {
      yahooFinance.quote({
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

   return financeDataWrapper.create({
      financeDataFetcher: yahooCompany,
      filter: (response) => ({
         [responseProperty]: {
            lastDividendRate: response.summaryDetail.dividendRate,
            lastDividendYield: response.summaryDetail.dividendYield,
            lastDividendDate: response.summaryDetail.exDividendDate,
            fiveYearAvgDividendYield: response.summaryDetail.fiveYearAvgDividendYield,
            trailingPriceToEarnings: response.summaryDetail.trailingPE,
            trailingEarningsPerShare: response.defaultKeyStatistics.trailingEps,
            currency: response.summaryDetail.currency
         }
      })
   });
};

export default yahooCompanyFetcher;