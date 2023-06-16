const { startBreakSchedulers } = require('./background_tasks/schedulers/breakScheduler');
const { startUpdateSchedulers } = require('./background_tasks/schedulers/updateScheduler');
const { startTextSchedulers } = require('./background_tasks/schedulers/textScheduler');

startBreakSchedulers();
startUpdateSchedulers();
startTextSchedulers();

console.log('Schedulers started');