import googleFinance from 'google-finance';
import yahooFinance from 'yahoo-finance';
import moment from 'moment';
import axois from 'axios';

const startOfYear = moment().startOf('year');
const today = moment();

yahooFinance.historical({
   symbol: 'O3P.F',
   from: startOfYear.toDate(),
   to: today.toDate(),
   period: 'v'
}, function (err, quotes) {
   console.log(quotes);
});

yahooFinance.quote({
   symbol: 'O3P.F',
   modules: ['summaryDetail', "defaultKeyStatistics"]
}, function (err, quotes) {
   console.log(quotes);
});

const googleNews = googleFinance.companyNews({
   symbol: "VIE:POST",
   page_size: 3 // eslint-disable-line camelcase
});

googleNews.then(news => {
   console.log(news);
});

axois.get("https://www.google.com/finance/getprices?q=POST&x=VIE&i=240&p=1d&f=d,c,h,l,o,v")
   .then(response => console.log(response.data));

export {
   googleNews
};