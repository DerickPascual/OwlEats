const scraper = require('./scraper');
const puppeteer = require('puppeteer');

describe('north servery tests', () => {
    
    let menuData;

    beforeAll(async () => {
        const browser = await puppeteer.launch({
            headless: false
        });

        const url = "https://dining.rice.edu/north-servery";

        menuData = await scraper(browser, url);

        await browser.close();
    });

    test('north menu data has length of 14', () => {
        expect(menuData.length).toBe(14);
    });

    test('north menu data contains 7 dinners', () => {
        let dinCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'DINNER') {
                dinCount += 1;
            }
        }

        expect(dinCount).toBe(7);
    });

    test('north menu data contains 7 lunches', () => {
        let lunCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'LUNCH') {
                lunCount += 1;
            }
        }

        expect(lunCount).toBe(7);
    });

    describe('north servery weekday tests', () => {
        let monFound;
        let tuesFound;
        let wedFound;
        let thursFound;
        let friFound;
        let satFound;
        let sunFound;

        beforeAll(() => {
            for (menu of menuData) {
                switch (menu.day) {
                    case "MONDAY":
                        monFound = true;
                        break;
                    case "TUESDAY":
                        tuesFound = true;
                        break;
                    case "WEDNESDAY":
                        wedFound = true;
                        break;
                    case "THURSDAY":
                        thursFound = true;
                        break;
                    case "FRIDAY":
                        friFound = true;
                        break;
                    case "SATURDAY":
                        satFound = true;
                        break;
                    case "SUNDAY":
                        sunFound = true;
                        break;
                }
            }
        });

        test('north contains monday', () => {
            expect(monFound).toBe(true);
        });

        test('north contains tuesday', () => {
            expect(tuesFound).toBe(true);
        });
        
        test('north contains wednesday', () => {
            expect(wedFound).toBe(true);
        });

        test('north contains thursday', () => {
            expect(thursFound).toBe(true);
        });

        test('north contains friday', () => {
            expect(friFound).toBe(true);
        });

        test('north contains saturday', () => {
            expect(satFound).toBe(true);
        });

        test('north contains sunday', () => {
            expect(sunFound).toBe(true);
        });
    });

});

describe('south servery tests', () => {
    
    let menuData;

    beforeAll(async () => {
        const browser = await puppeteer.launch({
            headless: false
        });

        const url = "https://dining.rice.edu/south-servery";

        menuData = await scraper(browser, url);

        await browser.close();
    });

    test('south menu data has length of 14', () => {
        expect(menuData.length).toBe(14);
    });

    test('south menu data contains 7 dinners', () => {
        let dinCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'DINNER') {
                dinCount += 1;
            }
        }

        expect(dinCount).toBe(7);
    });

    test('south menu data contains 7 lunches', () => {
        let lunCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'LUNCH') {
                lunCount += 1;
            }
        }

        expect(lunCount).toBe(7);
    });

    describe('south servery weekday tests', () => {
        let monFound;
        let tuesFound;
        let wedFound;
        let thursFound;
        let friFound;
        let satFound;
        let sunFound;

        beforeAll(() => {
            for (menu of menuData) {
                switch (menu.day) {
                    case "MONDAY":
                        monFound = true;
                        break;
                    case "TUESDAY":
                        tuesFound = true;
                        break;
                    case "WEDNESDAY":
                        wedFound = true;
                        break;
                    case "THURSDAY":
                        thursFound = true;
                        break;
                    case "FRIDAY":
                        friFound = true;
                        break;
                    case "SATURDAY":
                        satFound = true;
                        break;
                    case "SUNDAY":
                        sunFound = true;
                        break;
                }
            }
        });

        test('south contains monday', () => {
            expect(monFound).toBe(true);
        });

        test('south contains tuesday', () => {
            expect(tuesFound).toBe(true);
        });
        
        test('south contains wednesday', () => {
            expect(wedFound).toBe(true);
        });

        test('south contains thursday', () => {
            expect(thursFound).toBe(true);
        });

        test('south contains friday', () => {
            expect(friFound).toBe(true);
        });

        test('south contains saturday', () => {
            expect(satFound).toBe(true);
        });

        test('south contains sunday', () => {
            expect(sunFound).toBe(true);
        });
    });

});

describe('west servery tests', () => {
    
    let menuData;

    beforeAll(async () => {
        const browser = await puppeteer.launch({
            headless: false
        });

        const url = "https://dining.rice.edu/west-servery";

        menuData = await scraper(browser, url);

        await browser.close();
    });

    test('west menu data has length of 14', () => {
        expect(menuData.length).toBe(14);
    });

    test('west menu data contains 7 dinners', () => {
        let dinCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'DINNER') {
                dinCount += 1;
            }
        }

        expect(dinCount).toBe(7);
    });

    test('west menu data contains 7 lunches', () => {
        let lunCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'LUNCH') {
                lunCount += 1;
            }
        }

        expect(lunCount).toBe(7);
    });

    describe('west servery weekday tests', () => {
        let monFound;
        let tuesFound;
        let wedFound;
        let thursFound;
        let friFound;
        let satFound;
        let sunFound;

        beforeAll(() => {
            for (menu of menuData) {
                switch (menu.day) {
                    case "MONDAY":
                        monFound = true;
                        break;
                    case "TUESDAY":
                        tuesFound = true;
                        break;
                    case "WEDNESDAY":
                        wedFound = true;
                        break;
                    case "THURSDAY":
                        thursFound = true;
                        break;
                    case "FRIDAY":
                        friFound = true;
                        break;
                    case "SATURDAY":
                        satFound = true;
                        break;
                    case "SUNDAY":
                        sunFound = true;
                        break;
                }
            }
        });

        test('west contains monday', () => {
            expect(monFound).toBe(true);
        });

        test('west contains tuesday', () => {
            expect(tuesFound).toBe(true);
        });
        
        test('west contains wednesday', () => {
            expect(wedFound).toBe(true);
        });

        test('west contains thursday', () => {
            expect(thursFound).toBe(true);
        });

        test('west contains friday', () => {
            expect(friFound).toBe(true);
        });

        test('west contains saturday', () => {
            expect(satFound).toBe(true);
        });

        test('west contains sunday', () => {
            expect(sunFound).toBe(true);
        });
    });

});

describe('seibel servery tests', () => {
    
    let menuData;

    beforeAll(async () => {
        const browser = await puppeteer.launch({
            headless: false
        });

        const url = "https://dining.rice.edu/seibel-servery";

        menuData = await scraper(browser, url);

        await browser.close();
    });

    test('seibel menu data has length of 14', () => {
        expect(menuData.length).toBe(14);
    });

    test('seibel menu data contains 7 dinners', () => {
        let dinCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'DINNER') {
                dinCount += 1;
            }
        }

        expect(dinCount).toBe(7);
    });

    test('seibel menu data contains 7 lunches', () => {
        let lunCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'LUNCH') {
                lunCount += 1;
            }
        }

        expect(lunCount).toBe(7);
    });

    describe('seibel servery weekday tests', () => {
        let monFound;
        let tuesFound;
        let wedFound;
        let thursFound;
        let friFound;
        let satFound;
        let sunFound;

        beforeAll(() => {
            for (menu of menuData) {
                switch (menu.day) {
                    case "MONDAY":
                        monFound = true;
                        break;
                    case "TUESDAY":
                        tuesFound = true;
                        break;
                    case "WEDNESDAY":
                        wedFound = true;
                        break;
                    case "THURSDAY":
                        thursFound = true;
                        break;
                    case "FRIDAY":
                        friFound = true;
                        break;
                    case "SATURDAY":
                        satFound = true;
                        break;
                    case "SUNDAY":
                        sunFound = true;
                        break;
                }
            }
        });

        test('seibel contains monday', () => {
            expect(monFound).toBe(true);
        });

        test('seibel contains tuesday', () => {
            expect(tuesFound).toBe(true);
        });
        
        test('seibel contains wednesday', () => {
            expect(wedFound).toBe(true);
        });

        test('seibel contains thursday', () => {
            expect(thursFound).toBe(true);
        });

        test('seibel contains friday', () => {
            expect(friFound).toBe(true);
        });

        test('seibel contains saturday', () => {
            expect(satFound).toBe(true);
        });

        test('seibel contains sunday', () => {
            expect(sunFound).toBe(true);
        });
    });

});

describe('baker servery tests', () => {
    
    let menuData;

    beforeAll(async () => {
        const browser = await puppeteer.launch({
            headless: false
        });

        const url = "https://dining.rice.edu/baker-college-kitchen";

        menuData = await scraper(browser, url);

        await browser.close();
    });

    test('baker menu data has length of 14', () => {
        expect(menuData.length).toBe(14);
    });

    test('baker menu data contains 7 dinners', () => {
        let dinCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'DINNER') {
                dinCount += 1;
            }
        }

        expect(dinCount).toBe(7);
    });

    test('baker menu data contains 7 lunches', () => {
        let lunCount = 0;

        for (menu of menuData) {
            if (menu.mealtime === 'LUNCH') {
                lunCount += 1;
            }
        }

        expect(lunCount).toBe(7);
    });

    describe('baker servery weekday tests', () => {
        let monFound;
        let tuesFound;
        let wedFound;
        let thursFound;
        let friFound;
        let satFound;
        let sunFound;

        beforeAll(() => {
            for (menu of menuData) {
                switch (menu.day) {
                    case "MONDAY":
                        monFound = true;
                        break;
                    case "TUESDAY":
                        tuesFound = true;
                        break;
                    case "WEDNESDAY":
                        wedFound = true;
                        break;
                    case "THURSDAY":
                        thursFound = true;
                        break;
                    case "FRIDAY":
                        friFound = true;
                        break;
                    case "SATURDAY":
                        satFound = true;
                        break;
                    case "SUNDAY":
                        sunFound = true;
                        break;
                }
            }
        });

        test('baker contains monday', () => {
            expect(monFound).toBe(true);
        });

        test('baker contains tuesday', () => {
            expect(tuesFound).toBe(true);
        });
        
        test('baker contains wednesday', () => {
            expect(wedFound).toBe(true);
        });

        test('baker contains thursday', () => {
            expect(thursFound).toBe(true);
        });

        test('baker contains friday', () => {
            expect(friFound).toBe(true);
        });

        test('baker contains saturday', () => {
            expect(satFound).toBe(true);
        });

        test('baker contains sunday', () => {
            expect(sunFound).toBe(true);
        });
    });

});
















