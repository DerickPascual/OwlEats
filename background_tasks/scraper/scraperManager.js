const puppeteer = require('puppeteer');
const scraper = require('./scraper');

const setDays = (menus) => {
    // The data comes in the form [{ day: Monday, mealtime: lunch ... }, {day: null, mealtime: dinner ...} ... ]
    // So for every other element we set the day attribute to the same as the element before it.
    for (let i = 1; i < menus.length; i += 2) {
        menus[i].day = menus[i - 1].day
    }
}

const printMenus = (menus) => {
    for (menu of menus) {
        console.log(menu.day);
        console.log(menu.mealtime);
        for (mitem of menu.mitems) {
            console.log(mitem.name);
            console.log(mitem.allergens);
        }
        console.log('----------------------------------------------------------------------------------------');
    }
}

const getMenus = async (url) => {
    const browser = await puppeteer.launch({
        headless: false
    });

    const menus = await scraper(browser, url);

    setDays(menus);

    await browser.close();

    return menus;
}

const getAllMenus = async () => {
    northMenus = await getMenus('https://dining.rice.edu/north-servery');
    southMenus = await getMenus('https://dining.rice.edu/south-servery');
    westMenus = await getMenus('https://dining.rice.edu/west-servery');
    seibelMenus = await getMenus('https://dining.rice.edu/seibel-servery');
    bakerMenus = await getMenus('https://dining.rice.edu/baker-college-kitchen');

    return {
        north: northMenus,
        south: southMenus,
        west: westMenus,
        seibel: seibelMenus,
        baker: bakerMenus
    };
};

module.exports = getAllMenus;