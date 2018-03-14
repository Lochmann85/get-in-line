import googleFinance from 'google-finance';

import * as financeDataWrapper from './../financeDataWrapper';

const googleNewsFetcher = ({ responseProperty }) => {
   const googleNews = (company) => googleFinance.companyNews({
      symbol: company.googleSymbol,
      page_size: 3 // eslint-disable-line camelcase
   });

   return financeDataWrapper.create({
      financeDataFetcher: googleNews,
      filter: (response) => ({ [responseProperty]: response })
   });
};

export default googleNewsFetcher;