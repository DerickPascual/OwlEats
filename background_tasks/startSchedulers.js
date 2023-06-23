const { startBreakSchedulers } = require('./schedulers/breakScheduler');
const { startUpdateSchedulers } = require('./schedulers/updateScheduler');
const { startTextSchedulers } = require('./schedulers/textScheduler');

startBreakSchedulers();
startUpdateSchedulers();
startTextSchedulers();

console.log('******STARTED SCHEDULERS******');