import yahooFinance from 'yahoo-finance';
import moment from 'moment';
import axois from 'axios';

import * as financeDataWrapper from './lib/financeApi/financeDataWrapper';
import googleNewsFetcher from './lib/financeApi/financeFetcher/googleNewsFetcher';
import yahooCompanyFetcher from './lib/financeApi/financeFetcher/yahooCompanyFetcher';

const startOfYear = moment().startOf('year').subtract(1, "year");
const today = moment();

const mockedCompany = {
   googleSymbol: "VIE:POST",
   yahooSymbol: "O3P.F",
};

describe("finance system test", () => {

   it("should fetch google news data and add it to a composed object", (done) => {
      const expectedName = "news";

      const googleNews = googleNewsFetcher({
         responseProperty: expectedName
      });

      googleNews.fetch(mockedCompany)
         .then(response => {
            response.should.have.key(expectedName);
            response.news.should.be.a("array");

            done();
         })
         .catch(done);
   });

   it("should fetch yahoo company data and add it to a composed object", (done) => {
      const expectedName = "statistics";

      const yahooCompany = yahooCompanyFetcher({
         responseProperty: expectedName
      });

      yahooCompany.fetch(mockedCompany)
         .then(response => {
            response.should.have.key(expectedName);
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
      const expectedName = "dividends";

      const yahooDividend = (company) => new Promise((resolve, reject) => {
         yahooFinance.historical({
            symbol: company.yahooSymbol,
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
         filter: (response) => ({ [expectedName]: response })
      });

      yahooDividendFetcher.fetch(mockedCompany)
         .then(response => {
            response.should.have.key(expectedName);
            response.dividends.should.be.a("array");

            done();
         })
         .catch(done);
   });

   it("should fetch google price data and add it to a composed object", (done) => {
      const expectedName = "intradayPrice";

      const googlePrice = (company) => {
         const splitSympol = company.googleSymbol.split(":");

         return axois.get(`https://www.google.com/finance/getprices?x=${splitSympol[0]}&q=${splitSympol[1]}&i=240&p=1d&f=c`)
      };

      const googlePriceFetcher = financeDataWrapper.create({
         financeDataFetcher: googlePrice,
         filter: (response) => ({ [expectedName]: response.data })
      });

      googlePriceFetcher.fetch(mockedCompany)
         .then(response => {
            response.should.have.key(expectedName);

            done();
         })
         .catch(done);
   });
});