let onBreak = true;

// end of summer break
const summerEndScheduler = cron.schedule('0 0 19 8 *', () => {
    onBreak = false;
}, {
    scheduled: false,
    timezone: 'America/Chicago'
});

// first semester finals. There is a possibility that a servery will be closed for 2+ weeks by this date.
const firstSemFinalsScheduler = cron.schedule('0 0 10 12 *', () => {
    onBreak = true;
}, {
    scheduled: false,
    timezone: 'America/Chicago'
})

// start of 2nd semester
const secondSemStartScheduler = cron.schedule('0 0 8 1 *', () => {
    onBreak = false;
}, {
    scheduled: false,
    timezone: 'America/Chicago'
});

// second semester finals. Possibility that a servery will be closed for 2+ weeks by this date.
const secondSemFinalsSchedular = cron.schedule('0 0 24 4 *', () => {
    onBreak = true;
}, {
    scheduled: false,
    timezone: 'America/Chicago'
});

const startBreakSchedulers = () => {
    summerEndScheduler.start();
    firstSemFinalsScheduler.start();
    secondSemStartScheduler.start();
    secondSemFinalsSchedular.start();
}

module.exports = { onBreak, startBreakSchedulers };