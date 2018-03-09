import googleFinance from 'google-finance';
import moment from 'moment';

const today = moment().endOf('day');
const weekEarlier = moment(today).subtract(1, 'weeks');

googleFinance.historical({
   symbol: "VIE:POST",
   from: weekEarlier.toDate(),
   to: today.toDate()
}).then(data => {
   console.log(data);
});

googleFinance.companyNews({
   symbol: "VIE:POST",
   page_size: 3
}).then(news => {
   console.log(news)
});