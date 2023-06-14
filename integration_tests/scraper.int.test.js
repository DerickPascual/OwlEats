const scraper = require('../background_tasks/scraper/scraper');
const puppeteer = require('puppeteer');

describe("NORTH SERVERY TESTS", () => {
    let browser;
    let menus;
    const url = 'https://dining.rice.edu/north-servery';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        menus = await scraper(browser, url);
    });

    afterAll(async () => {
        await browser.close();
    })

    test('Menus returns an array with length of 14', () => {
        expect(menus.length).toBe(14);
    });

    test('Menus has 7 objects with mealtime: dinner', () => {
        let dinCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') dinCount += 1;
        }

        expect(dinCount).toBe(7);
    });

    test('Menus has 7 objects with mealtime: lunch', () => {
        let lunCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') lunCount += 1;
        }

        expect(lunCount).toBe(7);
    });

    describe('Menus objects contain all weekdays', () => {
        let hasMonday;
        let hasTuesday;
        let hasWednesday;
        let hasThursday;
        let hasFriday;
        let hasSaturday;
        let hasSunday;

        beforeAll(() => {
            for (menu of menus) {
                switch (menu.day) {
                    case 'monday':
                        hasMonday = true;
                        break;
                    case 'tuesday':
                        hasTuesday = true;
                        break;
                    case 'wednesday':
                        hasWednesday = true;
                        break;
                    case 'thursday':
                        hasThursday = true;
                        break;
                    case 'friday':
                        hasFriday = true;
                        break;
                    case 'saturday':
                        hasSaturday = true;
                        break;
                    case 'sunday':
                        hasSunday = true;
                        break;
                }
            }
        });

        test('Menus has monday', () => {
            expect(hasMonday).toBe(true);
        });

        test('Menus has tuesday', () => {
            expect(hasTuesday).toBe(true);
        });

        test('Menus has wednesday', () => {
            expect(hasWednesday).toBe(true);
        });

        test('Menus has thursday', () => {
            expect(hasThursday).toBe(true);
        });

        test('Menus has friday', () => {
            expect(hasFriday).toBe(true);
        });

        test('Menus has saturday', () => {
            expect(hasSaturday).toBe(true);
        });

        test('Menus has sunday', () => {
            expect(hasSunday).toBe(true);
        });
    });
});

describe("SOUTH SERVERY TESTS", () => {
    let browser;
    let menus;
    const url = 'https://dining.rice.edu/south-servery';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        menus = await scraper(browser, url);
    });

    afterAll(async () => {
        await browser.close();
    })

    test('Menus returns an array with length of 14', () => {
        expect(menus.length).toBe(14);
    });

    test('Menus has 7 objects with mealtime: dinner', () => {
        let dinCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') dinCount += 1;
        }

        expect(dinCount).toBe(7);
    });

    test('Menus has 7 objects with mealtime: lunch', () => {
        let lunCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') lunCount += 1;
        }

        expect(lunCount).toBe(7);
    });

    describe('Menus objects contain all weekdays', () => {
        let hasMonday;
        let hasTuesday;
        let hasWednesday;
        let hasThursday;
        let hasFriday;
        let hasSaturday;
        let hasSunday;

        beforeAll(() => {
            for (menu of menus) {
                switch (menu.day) {
                    case 'monday':
                        hasMonday = true;
                        break;
                    case 'tuesday':
                        hasTuesday = true;
                        break;
                    case 'wednesday':
                        hasWednesday = true;
                        break;
                    case 'thursday':
                        hasThursday = true;
                        break;
                    case 'friday':
                        hasFriday = true;
                        break;
                    case 'saturday':
                        hasSaturday = true;
                        break;
                    case 'sunday':
                        hasSunday = true;
                        break;
                }
            }
        });

        test('Menus has monday', () => {
            expect(hasMonday).toBe(true);
        });

        test('Menus has tuesday', () => {
            expect(hasTuesday).toBe(true);
        });

        test('Menus has wednesday', () => {
            expect(hasWednesday).toBe(true);
        });

        test('Menus has thursday', () => {
            expect(hasThursday).toBe(true);
        });

        test('Menus has friday', () => {
            expect(hasFriday).toBe(true);
        });

        test('Menus has saturday', () => {
            expect(hasSaturday).toBe(true);
        });

        test('Menus has sunday', () => {
            expect(hasSunday).toBe(true);
        });
    });
});

describe("WEST SERVERY TESTS", () => {
    let browser;
    let menus;
    const url = 'https://dining.rice.edu/west-servery';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        menus = await scraper(browser, url);
    });

    afterAll(async () => {
        await browser.close();
    })

    test('Menus returns an array with length of 14', () => {
        expect(menus.length).toBe(14);
    });

    test('Menus has 7 objects with mealtime: dinner', () => {
        let dinCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') dinCount += 1;
        }

        expect(dinCount).toBe(7);
    });

    test('Menus has 7 objects with mealtime: lunch', () => {
        let lunCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') lunCount += 1;
        }

        expect(lunCount).toBe(7);
    });

    describe('Menus objects contain all weekdays', () => {
        let hasMonday;
        let hasTuesday;
        let hasWednesday;
        let hasThursday;
        let hasFriday;
        let hasSaturday;
        let hasSunday;

        beforeAll(() => {
            for (menu of menus) {
                switch (menu.day) {
                    case 'monday':
                        hasMonday = true;
                        break;
                    case 'tuesday':
                        hasTuesday = true;
                        break;
                    case 'wednesday':
                        hasWednesday = true;
                        break;
                    case 'thursday':
                        hasThursday = true;
                        break;
                    case 'friday':
                        hasFriday = true;
                        break;
                    case 'saturday':
                        hasSaturday = true;
                        break;
                    case 'sunday':
                        hasSunday = true;
                        break;
                }
            }
        });

        test('Menus has monday', () => {
            expect(hasMonday).toBe(true);
        });

        test('Menus has tuesday', () => {
            expect(hasTuesday).toBe(true);
        });

        test('Menus has wednesday', () => {
            expect(hasWednesday).toBe(true);
        });

        test('Menus has thursday', () => {
            expect(hasThursday).toBe(true);
        });

        test('Menus has friday', () => {
            expect(hasFriday).toBe(true);
        });

        test('Menus has saturday', () => {
            expect(hasSaturday).toBe(true);
        });

        test('Menus has sunday', () => {
            expect(hasSunday).toBe(true);
        });
    });
});

describe("SEIBEL SERVERY TESTS", () => {
    let browser;
    let menus;
    const url = 'https://dining.rice.edu/seibel-servery';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        menus = await scraper(browser, url);
    });

    afterAll(async () => {
        await browser.close();
    })

    test('Menus returns an array with length of 14', () => {
        expect(menus.length).toBe(14);
    });

    test('Menus has 7 objects with mealtime: dinner', () => {
        let dinCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') dinCount += 1;
        }

        expect(dinCount).toBe(7);
    });

    test('Menus has 7 objects with mealtime: lunch', () => {
        let lunCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') lunCount += 1;
        }

        expect(lunCount).toBe(7);
    });

    describe('Menus objects contain all weekdays', () => {
        let hasMonday;
        let hasTuesday;
        let hasWednesday;
        let hasThursday;
        let hasFriday;
        let hasSaturday;
        let hasSunday;

        beforeAll(() => {
            for (menu of menus) {
                switch (menu.day) {
                    case 'monday':
                        hasMonday = true;
                        break;
                    case 'tuesday':
                        hasTuesday = true;
                        break;
                    case 'wednesday':
                        hasWednesday = true;
                        break;
                    case 'thursday':
                        hasThursday = true;
                        break;
                    case 'friday':
                        hasFriday = true;
                        break;
                    case 'saturday':
                        hasSaturday = true;
                        break;
                    case 'sunday':
                        hasSunday = true;
                        break;
                }
            }
        });

        test('Menus has monday', () => {
            expect(hasMonday).toBe(true);
        });

        test('Menus has tuesday', () => {
            expect(hasTuesday).toBe(true);
        });

        test('Menus has wednesday', () => {
            expect(hasWednesday).toBe(true);
        });

        test('Menus has thursday', () => {
            expect(hasThursday).toBe(true);
        });

        test('Menus has friday', () => {
            expect(hasFriday).toBe(true);
        });

        test('Menus has saturday', () => {
            expect(hasSaturday).toBe(true);
        });

        test('Menus has sunday', () => {
            expect(hasSunday).toBe(true);
        });
    });
});

describe("BAKER TESTS", () => {
    let browser;
    let menus;
    const url = 'https://dining.rice.edu/baker-college-kitchen';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        menus = await scraper(browser, url);
    });

    afterAll(async () => {
        await browser.close();
    })

    test('Menus returns an array with length of 14', () => {
        expect(menus.length).toBe(14);
    });

    test('Menus has 7 objects with mealtime: dinner', () => {
        let dinCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') dinCount += 1;
        }

        expect(dinCount).toBe(7);
    });

    test('Menus has 7 objects with mealtime: lunch', () => {
        let lunCount = 0;
        for (menu of menus) {
            if (menu.mealtime === 'dinner') lunCount += 1;
        }

        expect(lunCount).toBe(7);
    });

    describe('Menus objects contain all weekdays', () => {
        let hasMonday;
        let hasTuesday;
        let hasWednesday;
        let hasThursday;
        let hasFriday;
        let hasSaturday;
        let hasSunday;

        beforeAll(() => {
            for (menu of menus) {
                switch (menu.day) {
                    case 'monday':
                        hasMonday = true;
                        break;
                    case 'tuesday':
                        hasTuesday = true;
                        break;
                    case 'wednesday':
                        hasWednesday = true;
                        break;
                    case 'thursday':
                        hasThursday = true;
                        break;
                    case 'friday':
                        hasFriday = true;
                        break;
                    case 'saturday':
                        hasSaturday = true;
                        break;
                    case 'sunday':
                        hasSunday = true;
                        break;
                }
            }
        });

        test('Menus has monday', () => {
            expect(hasMonday).toBe(true);
        });

        test('Menus has tuesday', () => {
            expect(hasTuesday).toBe(true);
        });

        test('Menus has wednesday', () => {
            expect(hasWednesday).toBe(true);
        });

        test('Menus has thursday', () => {
            expect(hasThursday).toBe(true);
        });

        test('Menus has friday', () => {
            expect(hasFriday).toBe(true);
        });

        test('Menus has saturday', () => {
            expect(hasSaturday).toBe(true);
        });

        test('Menus has sunday', () => {
            expect(hasSunday).toBe(true);
        });
    });
});