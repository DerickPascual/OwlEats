const CronJob = require('cron').CronJob;
let onBreak = false;

// end of summer break
const summerEndScheduler = new CronJob({
    cronTime: '0 0 19 7 *',
    onTick: () => {
        onBreak = false;
    },
    timeZone: 'America/Chicago'
});

// first semester finals. There is a possibility that a servery will be closed for 2+ weeks by this date.
const firstSemFinalsScheduler = new CronJob({
    cronTime: '0 0 10 11 *',
    onTick: () => {
        onBreak = true;
    },
    timeZone: 'America/Chicago'
})

// start of 2nd semester
const secondSemStartScheduler = new CronJob({
    cronTime: '0 0 8 0 *',
    onTick: () => {
        onBreak = false;
    },
    timeZone: 'America/Chicago'
});

// second semester finals. Possibility that a servery will be closed for 2+ weeks by this date.
const secondSemFinalsSchedular = new CronJob({
    cronTime: '0 0 24 3 *',
    onTick: () => {
        onBreak = true;
    },
    timezone: 'America/Chicago'
});

const startBreakSchedulers = () => {
    summerEndScheduler.start();
    firstSemFinalsScheduler.start();
    secondSemStartScheduler.start();
    secondSemFinalsSchedular.start();
};

module.exports = { onBreak, startBreakSchedulers };