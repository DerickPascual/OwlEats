const puppeteer = require('puppeteer');
const scraper = require('./scraper');

const setDays = (menus) => {
    const newMenus = [];
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].day && menus[i].day.toLowerCase() === 'monday') {
            for (let j = i; j < menus.length - 1; j += 2) {
                newMenus.push(menus[j]);
                menus[j + 1].day = menus[j].day;
                newMenus.push(menus[j + 1]);
            }

            break;
        }
    }

    return newMenus;
}

// filters out blank items and &amp
const filterMitems = (mitems) => {
    filtered = []

    for (mitem of mitems) {
        if (!mitem.name) {
            continue;
        } else {
            if (mitem.name.includes('&amp;')) {
                mitem.name = mitem.name.replace('&amp;', '&');
            }

            filtered.push(mitem)
        }
    }

    return filtered;
}

// assumes that the menus have already gone through the setDays function
const restructureMenus = (menus) => {
    let newMenu = {
        monday: {lunch: [], dinner: []},
        tuesday: {lunch: [], dinner: []},
        wednesday: {lunch: [], dinner: []},
        thursday: {lunch: [], dinner: []},
        friday: {lunch: [], dinner: []},
        saturday: {lunch: [], dinner: []},
        sunday: {lunch: [], dinner: []}
    }

    for (menu of menus) {
        switch (menu.day) {
            case 'monday':
                menu.mealtime === 'lunch' ? newMenu.monday.lunch = filterMitems(menu.mitems) : newMenu.monday.dinner = filterMitems(menu.mitems);
                break;
            
            case 'tuesday':
                menu.mealtime === 'lunch' ? newMenu.tuesday.lunch = filterMitems(menu.mitems) : newMenu.tuesday.dinner = filterMitems(menu.mitems);
                break;

            case 'wednesday':
                menu.mealtime === 'lunch' ? newMenu.wednesday.lunch = filterMitems(menu.mitems) : newMenu.wednesday.dinner = filterMitems(menu.mitems);
                break;

            case 'thursday':
                menu.mealtime === 'lunch' ? newMenu.thursday.lunch = filterMitems(menu.mitems) : newMenu.thursday.dinner = filterMitems(menu.mitems);
                break;

            case 'friday':
                menu.mealtime === 'lunch' ? newMenu.friday.lunch = filterMitems(menu.mitems) : newMenu.friday.dinner = filterMitems(menu.mitems);
                break;

            case 'saturday':
                menu.mealtime === 'lunch' ? newMenu.saturday.lunch = filterMitems(menu.mitems) : newMenu.saturday.dinner = filterMitems(menu.mitems);
                break;

            case 'sunday':
                menu.mealtime === 'lunch' ? newMenu.sunday.lunch = filterMitems(menu.mitems) : newMenu.sunday.dinner = filterMitems(menu.mitems);
                break;

        }
    }

    return newMenu;
}

const getMenus = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    let menus = await scraper(browser, url);

    await browser.close();

    let newMenus = setDays(menus);

    newMenus = restructureMenus(newMenus);

    return newMenus;
}

const getAllMenus = async () => {
    console.log('******SCRAPING DINING WEB PAGES******');

    northMenus = await getMenus('https://dining.rice.edu/north-servery');
    southMenus = await getMenus('https://dining.rice.edu/south-servery');
    westMenus = await getMenus('https://dining.rice.edu/west-servery');
    seibelMenus = await getMenus('https://dining.rice.edu/seibel-servery');
    bakerMenus = await getMenus('https://dining.rice.edu/baker-college-kitchen');

    console.log("******MENUS SUCCESSFULLY SCRAPED******");

    return {
        north: northMenus,
        south: southMenus,
        west: westMenus,
        seibel: seibelMenus,
        baker: bakerMenus
    };
};

if (process.env.NODE_ENV === "test") {
    module.exports = { filterMitems, restructureMenus, getMenus, getAllMenus }
} else {
    module.exports = getAllMenus;
}