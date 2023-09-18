const CronJob = require('cron').CronJob;
const { getDelayTexts } = require('./updateScheduler');
const { fetchAllUsers } = require('../../models/users');
const { fetchMenus } = require('../../models/menus');
const { sendAllTexts } = require('../texts/textSender');
const { DateTime } = require('luxon');

// this isn't really necessary 
let mondayTextsSent = true;

const getWeekday = () => {
    const dt = DateTime.now().setZone('America/Chicago');
    switch (dt.weekday) {
        case 1:
            return 'monday';
        case 2:
            return 'tuesday';
        case 3:
            return 'wednesday';
        case 4:
            return 'thursday';
        case 5:
            return 'friday';
        case 6:
            return 'saturday';
        case 7:
            return 'sunday';
    };
};

const sendTexts = async (mealtime) => {
    const day = getWeekday();

    const users = await fetchAllUsers();

    console.log(users);

    const menus = await fetchMenus(day, mealtime);

    await sendAllTexts(menus, users, mealtime);
};

// runs until 12:55 checking if texts still need to be delayed. After 12:55, if menus are not updated, no texts will be sent.
const monLunchTextScheduler = new CronJob({
    cronTime: '*/5 10-12 * * 1',
    onTick: async () => {
        // mondayTextsSent flag is unecessary but it's here for my peace of mind lol, just in case the scheduler doesn't stop so the program doesn't spam people.
        const delayTexts = getDelayTexts();

        if (!delayTexts && !mondayTextsSent) {
            await sendTexts('lunch');
            mondayTextsSent = true;
            monLunchTextScheduler.stop();
        }
    },
    timeZone: 'America/Chicago'
});

// restarts the monday scheduler if texts have been sent
const monLunchTextRestartScheduler = new CronJob({
    cronTime: '30 13 * * 1',
    onTick: () => {
        mondayTextsSent = false;
        monLunchTextScheduler.start();
    },
    timeZone: 'America/Chicago'
});
    
const tuesThroughSunLunchTextScheduler = new CronJob({
    cronTime: '0 10 * * 0,2-6',
    onTick: async () => {
        await sendTexts('lunch');
    },
    timeZone: 'America/Chicago'
});

const dinnerTextScheduler = new CronJob({
    cronTime: '0 16 * * *',
    onTick: async () => {
        await sendTexts('dinner');
    },
    timeZone: 'America/Chicago'
});

const startTextSchedulers = () => {
    monLunchTextScheduler.start();
    monLunchTextRestartScheduler.start();
    tuesThroughSunLunchTextScheduler.start();
    dinnerTextScheduler.start();
}

module.exports = { startTextSchedulers };