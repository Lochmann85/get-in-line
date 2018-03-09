import googleFinance from 'google-finance';
import moment from 'moment';

import * as infiniteTimer from './infiniteTimerApi';

const today = moment().endOf('day');
const weekEarlier = moment(today).subtract(1, 'weeks');

const timestep = infiniteTimer.createTimestep({
   stepExecution: googleFinance.historical({
      symbol: "VIE:POST",
      from: weekEarlier.toDate(),
      to: today.toDate()
   }),
   timeInterval: 5000
});

const timer = infiniteTimer.createTimer({
   timestep
});

timer.start();