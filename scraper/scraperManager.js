const puppeteer = require('puppeteer');
const scraper = require('./scraper');

const setDays = (menuData) => {
    // The data comes in the form [{ day: Monday, mealtime: lunch ... }, {day: null, mealtime: dinner ...} ... ]
    // So for every other element we set the day attribute to the same as the element before it.
    for (let i = 1; i < menuData.length; i += 2) {
        menuData[i].day = menuData[i - 1].day
    }
}

const printMenuData = (menuData) => {
    for (menu of menuData) {
        console.log(menu.day);
        console.log(menu.mealtime);
        for (mitem of menu.mitems) {
            console.log(mitem.name);
            console.log(mitem.allergens);
        }
        console.log('----------------------------------------------------------------------------------------');
    }
}

const run = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const url = "https://dining.rice.edu/north-servery";

    const menuData = await scraper(browser, url);

    setDays(menuData);

    printMenuData(menuData);
};

run();