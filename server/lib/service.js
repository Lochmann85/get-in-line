import { googleNews } from './financeApi/finance';
import * as infiniteTimer from './infiniteTimerApi';

const timestep = infiniteTimer.createTimestep({
   stepExecution: googleNews,
   timeInterval: 5000
});

const timer = infiniteTimer.createTimer({
   timestep
});

timer.start();