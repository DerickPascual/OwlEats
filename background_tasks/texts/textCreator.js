const { DateTime } = require('luxon');
const { fetchMenus } = require('../../models/menus');
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
}

const createTxtHeader = (mealtime) => {
    formattedMtime = mealtime.charAt(0).toUpperCase() + mealtime.slice(1).toLowerCase();

    return `Today's ${formattedMtime} Menus:\n`;
};

const filterAllergens = (mitems, userAllergens) => {
    const filtered = [];
    for (mitem of mitems) {

        foundAllergen = false;
        for (allergen of userAllergens) {
            if (mitem.allergens.includes(allergen)) {
                foundAllergen = true;
                break;
            }
        }

        if (foundAllergen) continue;

        filtered.push(mitem.name);
    }

    return filtered;
};

const createTxtMenu = (filteredMitems, servery) => {
    const formattedServ = servery.toUpperCase();
    const menuHeader = `----${formattedServ}----\n`;
    
    let menuBody = '';
    if (filteredMitems.length === 0) {
        menuBody += 'Closed.\n';
        return menuHeader + menuBody;
    }

    for (i = 0; i < filteredMitems.length - 1; i++) {
        menuBody += `${filteredMitems[i]},\n`;
    }

    menuBody += `${filteredMitems[filteredMitems.length - 1]}.\n`;

    return menuHeader + menuBody;

}

const createTxtBody = async (menus, userServeries, userAllergens) => {
    const day = getWeekday();

    let txtBody = '\n';
    const serveries = ['north', 'west', 'south', 'seibel', 'baker'];
    for (servery of serveries) {
        if (!userServeries.includes(servery)) {
            continue;
        }
        
        mitems = filterAllergens(menus[servery], userAllergens);
        txtBody += createTxtMenu(mitems, servery) + '\n';
    }

    return txtBody;
};

const createTxt = async (menus, mealtime, userServeries, userAllergens=[]) => {
    const txtHeader = createTxtHeader(mealtime);
    const txtBody = await createTxtBody(mealtime, userServeries, userAllergens);

    return txtHeader + txtBody + getRandPhrase(mealtime);
}

module.exports = createTxt;