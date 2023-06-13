const cron = require('node-cron');
const getAllMenus = require('../scraper/scraperManager');
const { updateAllMenus, fetchMenus } = require('../../models/menus');
const onBreak = require('./onBreak');

const mitemsAreNew = (oldMitems, newMitems) => { 
    if (oldMitems.length !== newMitems.length) return true;

    for (i = 0; i< oldMitems.length; i++) {
        const oldMitem = oldMitems[i];
        const newMitem = newMitems[i];

        if (oldMitem.name !== newMitem.name) {
            return true;
        }
    }

    return false;
}

const menusAreNew = async (newWeeklyMenus) => {
    const serveries = ['north', 'west', 'south', 'seibel', 'baker'];
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    const isNew = { north: false, west: false, south: false, seibel: false, baker: false };

    for (servery of serveries) {
        for (day of days) {
            const oldMenu = await fetchMenus(day, 'lunch');

            const serveryMenuIsNew = mitemsAreNew(oldMenu[servery], newWeeklyMenus[servery][day]['lunch']);

            if (serveryMenuIsNew) {
                isNew[servery] = true;
            }

            if (onBreak) {
                // combinations of possible serveries on break
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
    }

    return false;
};

// end of summer break
cron.schedule('0 0 19 8 *', () => {
    onBreak = false;
});

// first semester finals. There is a possibility that a servery will be closed for 2+ weeks by this date.
cron.schedule('0 0 10 12 *', () => {
    onBreak = true;
});

// start of 2nd semester
cron.schedule('0 0 8 1 *', () => {
    onBreak = false;
});

// second semester finals. Possibility that a servery will be closed for 2+ weeks by this date.
cron.schedule('0 0 24 4 *', () => {
    onBreak = true;
});

// cron translation: At 10:20 on Monday
cron.schedule('20 10 * * 1', async () => {
    const newWeeklyMenus = await getAllMenus();

    const newMenusAreNew = await menusAreNew(newWeeklyMenus);
    if (newMenusAreNew) {
        await updateAllMenus(newWeeklyMenus);
    } else {
        // do something
    }
}, {
    scheduled: true,
    timezone: 'America/Chicago'
});

// description: update menus 
// cron translation: At 10:20 on every day of the week from Tuesday through Sunday
cron.schedule('20 10 * * 2-7', async () => {
    const newMenus = await getAllMenus();

    if (newMenusAreNew) {
        await updateAllMenus(newWeeklyMenus);
    }
}, { 
    scheduled: true,
    timezone: 'America/Chicago'
});



