const CronJob = require('cron').CronJob;
const getAllMenus = require('../scraper/scraperManager');
const { updateAllMenus, fetchWeeklyMenus, updateWeeklyMenusTable } = require('../../models/menus');
const onBreak = require('./breakScheduler');
const deepEqual = require('deep-equal');

let delayTexts = false;

const getDelayTexts = () => {
    return delayTexts;
}

const menusAreNew = (currentWeeklyMenus, newWeeklyMenus, onBreak) => {
    const serveries = ['north', 'west', 'south', 'seibel', 'baker'];

    const isNew = { north: false, west: false, south: false, seibel: false, baker: false };
    for (servery of serveries) {
        const serveryMenuIsNew = !deepEqual(currentWeeklyMenus[servery], newWeeklyMenus[servery]);

        if (serveryMenuIsNew) isNew[servery] = true;

        if (onBreak) {
            // There is a possibility for a false positive if another servery is open and hasn't been updated but one of these combination of serveries has been updated.
            // Not sure if there is a good solution to that other than monitoring which serveries are open during break and changing these conditions to accomodate that.
            if ((isNew.north && isNew.south) || (isNew.north && isNew.seibel) || (isNew.west && isNew.south) || (isNew.west && isNew.seibel)) {
                return true;
            }
        }

        if (isNew.north && isNew.west && isNew.south && isNew.seibel && isNew.baker) return true;
    }

    return false;
};

// returns true if menus have been updated, false otherwise
const updateMenusIfNew = async () => {
    console.log("*****GETTING NEW WEEKLY MENUS*****");
    const newWeeklyMenus = await getAllMenus();

    console.log("****FETCHING CURRENT WEEKLY MENUS*****");
    const currentWeeklyMenus = await fetchWeeklyMenus();
    
    const newMenusAreNew = menusAreNew(currentWeeklyMenus, newWeeklyMenus, onBreak);

    if (newMenusAreNew) {
        console.log("*****UPDATING DAILY MENUS IN DATABASE****")
        await updateAllMenus(newWeeklyMenus);
        console.log("*****DAILY MENUS FINISHED UPDATING*****");


        console.log("*****UPDATING WEEKLY MENUS IN DATABASE****");
        await updateWeeklyMenusTable(newWeeklyMenus);
        console.log("*****WEEKLY MENUS FINISHED UPDATING*****");

        return true;
    }

    return false;
};

// acounts for the case where menus aren't updated by 9:50
const monUpdateIfDelayedScheduler = new CronJob({
    cronTime: '*/10 10-13 * * 1',
    onTick: async () => {
        if (delayTexts) {
            const menusUpdated = await updateMenusIfNew();

            if (menusUpdated) {
                delayTexts = false;
                monUpdateIfDelayedScheduler.stop();
            }
        }
    },
    timeZone: 'America/Chicago'
});

const monUpdateScheduler = new CronJob({
    cronTime: '50 9 * * 1',
    onTick: async () => {
        const menusUpdated = await updateMenusIfNew();

        if (!menusUpdated) {
            delayTexts = true;
            monUpdateIfDelayedScheduler.start();
        }
    },
    timeZone: 'America/Chicago'
});

// runs in case menus aren't updated by 13:25. Then, a monday lunch text won't be sent.
const monUpdateDelayedCleanupScheduler = new CronJob({
    cronTime: '25 13 * * 1',
    onTick: () => {
        delayTexts = false;
        monUpdateIfDelayedScheduler.stop();
    },
    timeZone: 'America/Chicago'
});

const tuesThroughSunLunUpdateScheduler = new CronJob({
    cronTime: '50 9 * * 0,2-6',
    onTick: async () => {
        await updateMenusIfNew();
    },
    timeZone: 'America/Chicago'
});

// can run this without manipulating delayTexts since I've never seen menus not be updated by dinner.
const dailyDinUpdateScheduler = new CronJob({
    cronTime: '50 15 * * *',
    onTick: async () => {
        await updateMenusIfNew();
    },
    timeZone: 'America/Chicago'
});

const startUpdateSchedulers = () => {
    monUpdateScheduler.start();
    monUpdateDelayedCleanupScheduler.start();
    tuesThroughSunLunUpdateScheduler.start();
    dailyDinUpdateScheduler.start();
};

if (process.env.NODE_ENV === 'test') {
    module.exports = { getDelayTexts, menusAreNew, startUpdateSchedulers }
} else {
    module.exports = { getDelayTexts,startUpdateSchedulers };
}