import * as infiniteTimer from './infiniteTimerApi';

const timestep = infiniteTimer.createTimestep({
   stepExecution: Promise.resolve(true),
   timeInterval: 5000
});

const timer = infiniteTimer.createTimer({
   timestep
});

timer.start();