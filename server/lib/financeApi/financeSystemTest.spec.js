import yahooFinance from 'yahoo-finance';
import moment from 'moment';
import axois from 'axios';

import * as financeDataWrapper from './financeDataWrapper';
import googleNewsFetcher from './financeFetcher/googleNewsFetcher';

const startOfYear = moment().startOf('year').subtract(1, "year");
const today = moment();

const mockedCompany = {
   googleSymbol: "VIE:POST",
   yahooSymbol: "O3P.F",
};

describe("finance system test", () => {

   it("should fetch google news data and add it to a composed object", (done) => {
      const googleNews = googleNewsFetcher(mockedCompany);

      googleNews.fetch()
         .then(response => {
            response.should.have.key("news");
            response.news.should.be.a("array");

            done();
         })
         .catch(done);
   });

   it("should fetch yahoo company data and add it to a composed object", (done) => {
      const yahooCompany = new Promise((resolve, reject) => {
         yahooFinance.quote({
            symbol: mockedCompany.yahooSymbol,
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

      const yahooCompanyFetcher = financeDataWrapper.create({
         financeDataFetcher: yahooCompany,
         filter: (response) => ({
            statistics: {
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

      yahooCompanyFetcher.fetch()
         .then(response => {

            response.should.have.key("statistics");
            response.statistics.should.have.keys([
               "lastDividendRate",
               "lastDividendYield",
               "lastDividendDate",
               "fiveYearAvgDividendYield",
               "trailingPriceToEarnings",
               "trailingEarningsPerShare",
               "currency",
            ]);

            done();
         })
         .catch(done);
   });

   it("should fetch yahoo dividend data and add it to a composed object", (done) => {
      const yahooDividend = new Promise((resolve, reject) => {
         yahooFinance.historical({
            symbol: mockedCompany.yahooSymbol,
            from: startOfYear.toDate(),
            to: today.toDate(),
            period: "v"
         }, function (error, quotes) {
            if (!error) {
               resolve(quotes);
            }
            else {
               reject(error);
            }
         });
      });

      const yahooDividendFetcher = financeDataWrapper.create({
         financeDataFetcher: yahooDividend,
         filter: (response) => ({ dividends: response })
      });

      yahooDividendFetcher.fetch()
         .then(response => {
            response.should.have.key("dividends");
            response.dividends.should.be.a("array");

            done();
         })
         .catch(done);
   });

   it("should fetch google price data and add it to a composed object", (done) => {
      const splitSympol = mockedCompany.googleSymbol.split(":");

      const googlePrice = axois.get(`https://www.google.com/finance/getprices?x=${splitSympol[0]}&q=${splitSympol[1]}&i=240&p=1d&f=c`);

      const googlePriceFetcher = financeDataWrapper.create({
         financeDataFetcher: googlePrice,
         filter: (response) => ({ intradayPrice: response.data })
      });

      googlePriceFetcher.fetch()
         .then(response => {
            response.should.have.key("intradayPrice");

            done();
         })
         .catch(done);
   });
});