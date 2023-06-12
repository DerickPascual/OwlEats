require('dotenv').config();
const { DateTime } = require('luxon');
const getAllMenus = require('../scraper/scraperManager');
const getRandPhrase = require('./phraseGenerator');

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

// given allergen, menus of a specific servery 
// returns an array lunch mitem names (each name is a string)
const parseItems = (singleServWeeklyMenu, mealtime, allergens = []) => {
    const weekday = getWeekday();

    const items = [];
    for (menu of singleServWeeklyMenu) {
        // Find current menu
        if (menu.day.toLowerCase() === weekday && menu.mealtime.toLowerCase() === mealtime) {
            // Check if user has specified allergies
            for (mitem of menu.mitems) {

                let allergensFound = false;
                for (allergen of allergens) {
                    if (mitem.allergens.includes(allergen)) {
                        allergensFound = true;
                        break;
                    }
                }
                
                if (allergensFound) continue;

                items.push(mitem.name);
            }
        }
    }
    return items;
};

const createTxtHeader = (mealtime) => {
    let formattedMtime = mealtime.charAt(0).toUpperCase() + mealtime.slice(1);

    const header = `Today's ${formattedMtime} Menus:\n`;

    return header;
}

// prepares a single menu for inclusion in SMS text given a servery given the servery and the items
const formatTxtSingleMenu = (servery, items) => {
    // format servery
    let formattedServ = servery.toUpperCase();

    const menuHeader = `----${formattedServ}----`

    let menuBody = '\n';
    if (items.length === 0) {
        menuBody += 'Closed.\n'
    } else {
        // add item + comma to all items except last
        for (i = 0; i < items.length - 1; i++) {
            menuBody += `${items[i]},\n`;
        }

        // add last item
        menuBody += `${items[items.length - 1]}.\n`;
    }

    return menuHeader + menuBody;
}

const createTxtSingleMenu = (menus, servery, mealtime, userAllergens=[]) => {
    const items = parseItems(menus[servery], mealtime, userAllergens);
    const txtMenu = formatTxtSingleMenu(servery, items);
    return txtMenu;
}

// given an array of user serveries as well as the mealtime
// prepares the txt body for SMS text
const createTxtBody = (menus, mealtime, userServs, userAllergens=[]) => {
    let txtBody = '';
    
    let formattedMtime = mealtime.toLowerCase();

    if (userServs.includes('north')) {
        txtBody += `${createTxtSingleMenu(menus, 'north', formattedMtime, userAllergens)}\n`;
    }

    if (userServs.includes('west')) {
        txtBody += `${createTxtSingleMenu(menus, 'west', formattedMtime, userAllergens)}\n`;
    }

    if (userServs.includes('south')) {
        txtBody += `${createTxtSingleMenu(menus, 'south', formattedMtime, userAllergens)}\n`;
    }

    if (userServs.includes('seibel')) {
        txtBody += `${createTxtSingleMenu(menus, 'seibel', formattedMtime, userAllergens)}\n`;
    }

    if (userServs.includes('baker')) {
        txtBody += `${createTxtSingleMenu(menus, 'baker', formattedMtime, userAllergens)}\n`;
    }

    return txtBody;
}

const createTxt = (menus, mealtime, userServs, userAllergens=[], userPhrasePref=true) => {
    const txtHeader = createTxtHeader(mealtime);
    const txtBody = createTxtBody(menus, mealtime, userServs, userAllergens);

    if (userPhrasePref) {
        const phrase = getRandPhrase(mealtime);
        return `${txtHeader}\n${txtBody}${phrase}\n`
    }

    return `${txtHeader}\n${txtBody}`
}

if (process.env.NODE_ENV === 'test') {
    module.exports = {
        parseItems,
        formatTxtSingleMenu,
        createTxt
    }
} else {
    module.exports = {
        createTxt
    }
}

