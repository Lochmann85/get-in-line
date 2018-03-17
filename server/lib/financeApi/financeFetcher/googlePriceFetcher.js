import axios from 'axios';

import canFetchFinanceData from './../canFetchFinanceData';
import { defaultNameResponse } from './../responseNamer';

const googlePriceFetcher = ({ responseProperty }) => {
   const googlePrice = (company) => {
      const splitSympol = company.googleSymbol.split(":");

      return axios.get(`https://www.google.com/finance/getprices?x=${splitSympol[0]}&q=${splitSympol[1]}&i=240&p=1d&f=c`);
   };

   return Object.assign({}, canFetchFinanceData({
      financeDataFetcher: googlePrice,
      filter: (response) => (response.data),
      nameResponse: defaultNameResponse(responseProperty)
   }));
};

export default googlePriceFetcher;