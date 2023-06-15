const { DateTime } = require('luxon');
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

const filterDiets = (mitems, userDiets) => {
    const userIsVegan = userDiets.includes('vegan');
    const userIsVegetarian = userDiets.includes('vegetarian');
    const userIsHalal = userDiets.includes('halal');
    
    if (!userIsVegan && !userIsVegetarian && !userIsHalal) {
        return mitems;
    }

    const filtered = []
    for (mitem of mitems) {
        const mitemIsVegan = mitem.diets.includes('vegan');
        const mitemIsVegetarian = mitem.diets.includes('vegetarian');
        const mitemIsHalal = mitem.diets.includes('halal');

        if ((userIsVegan && userIsHalal)) {
            if (mitemIsVegan && mitemIsHalal) {
                filtered.push(mitem);
            }
        } else if (userIsVegetarian && userIsHalal) {
            if ((mitemIsVegetarian && mitemIsHalal) || (mitemIsVegan && mitemIsHalal)) {
                filtered.push(mitem);
            }
        } else if (userIsVegan) {
            if (mitemIsVegan) {
                filtered.push(mitem);
            }
        } else if (userIsVegetarian) {
            if (mitemIsVegan || mitemIsVegetarian) {
                filtered.push(mitem);
            }
        } else if (userIsHalal) {
            if (mitemIsHalal) {
                filtered.push(mitem)
            }
        }
    }

    return filtered;
}

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

        filtered.push(mitem);
    }

    return filtered;
};

const getMitemNames = (mitems) => {
    const names = [];
    for (mitem of mitems) {
        names.push(mitem.name);
    }
    return names;
}

const createTxtMenu = (mitemNames, servery) => {
    const formattedServ = servery.toUpperCase();
    const menuHeader = `----${formattedServ}----\n`;
    
    let menuBody = '';
    if (mitemNames.length === 0) {
        menuBody += 'No menu items today.\n';
        return menuHeader + menuBody;
    }

    for (i = 0; i < mitemNames.length - 1; i++) {
        menuBody += `${mitemNames[i]},\n`;
    }

    menuBody += `${mitemNames[mitemNames.length - 1]}.\n`;

    return menuHeader + menuBody;

}

const createTxtBody = (menus, userServeries, userDiets, userAllergens) => {
    const day = getWeekday();

    let txtBody = '\n';
    const serveries = ['north', 'west', 'south', 'seibel', 'baker'];
    for (servery of serveries) {
        if (!userServeries.includes(servery)) {
            continue;
        }
        
        mitems = filterDiets(menus[servery], userDiets);
        mitems = filterAllergens(menus[servery], userAllergens);
        mitems = getMitemNames(mitems);
        txtBody += createTxtMenu(mitems, servery) + '\n';
    }

    return txtBody;
};

const createTxt = (menus, mealtime, userServeries, userDiets=[], userAllergens=[]) => {
    const txtHeader = createTxtHeader(mealtime);
    const txtBody = createTxtBody(menus, mealtime, userServeries, userDiets, userAllergens);

    return txtHeader + txtBody + getRandPhrase(mealtime);
}

if (process.env.NODE_ENV === 'test') {
    module.exports = { createTxtBody, filterDiets, filterAllergens, createTxtMenu };
} else {
    module.exports = createTxt;
}