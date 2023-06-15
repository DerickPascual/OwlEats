const cron = require('node-cron');
const getAllMenus = require('../scraper/scraperManager');
const { updateAllMenus, fetchWeeklyMenus } = require('../../models/menus');
const onBreak = require('./breakScheduler');
const deepEqual = require('deep-equal');

let delayTexts = false;

const menusAreNew = (currentWeeklyMenus, newWeeklyMenus, onBreak) => {
    const serveries = ['north', 'west', 'south', 'seibel', 'baker'];

    const isNew = { north: false, west: false, south: false, seibel: false, baker: false };

    for (servery of serveries) {
        const serveryMenuIsNew = !deepEqual(currentWeeklyMenus[servery], newWeeklyMenus[servery]);

        if (serveryMenuIsNew) {
            isNew[servery] = true;
        }

        if (onBreak) {
            // combinations of possible serveries on break
            // There is a possibility for a false positive if another servery is open and hasn't been updated but one of these combination of serveries has been updated.
            // Not sure if there is a good solution to that other than monitoring which serveries are open during break and changing these conditions to accomodate that.
            if ((isNew.north && isNew.south) || (isNew.north && isNew.seibel) || (isNew.west && isNew.south) || (isNew.west && isNew.seibel)) {
                return true;
            }
        }

        // There's only a possibility for a false negative if a servery is closed for 2+ weeks and not updated. I accounted for this with onBreak variable.
        // Otherwise, every single servery menu should be updated on Monday.
        if (isNew.north && isNew.west && isNew.south && isNew.seibel && isNew.baker) {
            return true;
        }
    }

    return false;
};

// cron translation: At 10:20 on Monday
const monUpdate = cron.schedule('20 10 * * 1', async () => {
    const newWeeklyMenus = await getAllMenus();

    const currentWeeklyMenus = await fetchWeeklyMenus();
    const newMenusAreNew = await menusAreNew(currentWeeklyMenus, newWeeklyMenus, onBreak);
    if (newMenusAreNew) {
        await updateAllMenus(newWeeklyMenus);
    } else {
        // do something
    }
}, { timezone: 'America/Chicago', scheduled: false });

// description: update menus 
// cron translation: At 10:20 on every day of the week from Tuesday through Sunday
const tuesThroughSunUpdate = cron.schedule('20 10 * * 2-7', async () => {
    const newWeeklyMenus = await getAllMenus();

    const currentWeeklyMenus = await fetchWeeklyMenus();
    const newMenusAreNew = await menusAreNew(currentWeeklyMenus, newWeeklyMenus, onBreak);

    if (newMenusAreNew) {
        await updateAllMenus(newWeeklyMenus);
    }
}, { timezone: 'America/Chicago', scheduled: false });

const startUpdateSchedulers = () => {
    monUpdate.start();
    tuesThroughSunUpdate.start();
};

if (process.env.NODE_ENV === 'test') {
    module.exports = { delayTexts, menusAreNew, startUpdateSchedulers }
} else {
    module.exports = { delayTexts, startUpdateSchedulers };
}