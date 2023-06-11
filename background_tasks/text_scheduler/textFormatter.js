const { DateTime } = require('luxon');
const getAllMenus = require('../scraper/scraperManager');

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
const getLunchItems = (menus, allergens = []) => {
    const weekday = getWeekday();
    
    const lunchItems = [];

    for (menu of menus) {
        // Find current menu
        if (menu.day.toLowerCase() === weekday && menu.mealtime.toLowerCase() === 'lunch') {
            // Check if user has specified allergies
            for (mitem of menu.mitems) {

                let allergensFound = false;
                for (allergen of allergens) {
                    if (allergen in mitem.allergens) {
                        allergensFound = true;
                        break;
                    }
                }
                
                if (allergensFound) continue;

                lunchItems.push(mitem.name);
            }
        }
    }

    return lunchItems;
};

// given allergen, menus of a specific servery 
// returns an array dinner mitem names (each name is a string)
const getDinnerItems = (menus, allergens = []) => {
    const weekday = getWeekday();

    const dinItems = [];

    for (menu of menus) {
        if (menu.day.toLowerCase() === weekday && menu.mealtime.toLowerCase() === 'dinner') {
            for (mitem of menu.mitems) {

                let allergensFound = false;
                for (allergen of allergens) {
                    if (allergen in mitem.allergens) {
                        allergensFound = true;
                        break;
                    }
                }

                if (allergensFound) continue;

                dinItems.push(mitem.name);
            }
        }
    }

    return dinItems;
}

const test = async () => {
    menus = await getAllMenus();


    console.log(getLunchItems(menus.north));
    console.log(getDinnerItems(menus.north));
};

test();
