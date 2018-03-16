import googleFinance from 'google-finance';

import canFetchFinanceData from './../canFetchFinanceData';
import { defaultNameResponse } from './../responseNamer';
import { defaultFilter } from './../filter';

const googleNewsFetcher = ({ responseProperty }) => {
   const googleNews = (company) => googleFinance.companyNews({
      symbol: company.googleSymbol,
      page_size: 3, // eslint-disable-line camelcase
      error: true
   });

   return Object.assign({}, canFetchFinanceData({
      financeDataFetcher: googleNews,
      filter: defaultFilter,
      nameResponse: defaultNameResponse(responseProperty)
   }));
};

export default googleNewsFetcher;