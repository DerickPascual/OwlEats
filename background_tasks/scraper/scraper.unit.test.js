const scraper = require('./scraper');
const puppeteer = require('puppeteer');
const path = require('path');

describe("Menus test with empty menus and some no name mitems", () => {
    let browser;
    let menus;
    const url = `file://${path.join(__dirname, 'mock_pages', 'northMenus_6_13_23.html')}`

    beforeAll(async () => {
        browser = await puppeteer.launch({
          headless: "new"
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

    test('Items are expected items', () => {
        expect(menus).toStrictEqual([ 
            {
                day: 'monday',
                mealtime: 'lunch',
                mitems: [
                    { name: 'Chicken Tagine', diets: ['halal'], allergens: [] },
                    { name: 'Okra Stew', diets: [], allergens: ['soy'] },
                    { name: 'Fish Malabar', diets: [], allergens: ['soy', 'fish'] },
                    { name: 'Chicken Adobo', diets: [], allergens: ['soy'] },
                    { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
                    { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
                    { name: 'Beef Chimichurri', diets: [], allergens: [] }
                ]
            },
            { day: null, mealtime: 'dinner', mitems: [ { name: '', diets: [], allergens: [] } ] },
            {
                day: 'tuesday',
                mealtime: 'lunch',
                mitems: [        
                    {      
                      name: 'Seafood Cioppino',
                      diets: [],
                      allergens: [ 'gluten', 'soy', 'fish', 'shellfish' ]
                    },
                    { name: 'Paella Rice', diets: [ 'vegan' ], allergens: [] },
                    {
                      name: 'Chicken Pho',
                      diets: [ 'halal' ],
                      allergens: [ 'gluten', 'soy' ]
                    },
                    { name: 'Refried Beans', diets: [ 'vegan' ], allergens: [] },
                    {
                      name: 'Coconut Curry Chicken',
                      diets: [],
                      allergens: [ 'gluten', 'soy' ]
                    },
                    {
                      name: 'Shrimp Pad Thai',
                      diets: [],
                      allergens: [ 'gluten', 'soy', 'eggs', 'fish', 'shellfish' ]
                    },
                    {
                      name: 'Chicken Stuffed Poblano',
                      diets: [],
                      allergens: [ 'gluten', 'soy', 'dairy' ]
                    }
                  ]
            },
            { day: null, mealtime: 'dinner', mitems: [ { name: '', diets: [], allergens: [] } ] },
            {
                day: 'wednesday',
                mealtime: 'lunch',
                mitems: [        
                    {      
                      name: 'Falafel',
                      diets: [ 'vegan' ],
                      allergens: [ 'gluten', 'soy' ]
                    },
                    { name: "Shepperd's Pie", diets: [], allergens: [ 'soy', 'dairy' ] },
                    { name: 'Pozole', diets: [], allergens: [ 'soy' ] },
                    { name: 'Kings Casserole', diets: [], allergens: [ 'dairy' ] },
                    { name: 'Red Curry Cod', diets: [], allergens: [ 'gluten', 'fish' ] },
                    {
                      name: 'Lamb & Beef Gyro with Tzatziki',
                      diets: [ 'halal' ],
                      allergens: [ 'gluten', 'soy', 'dairy' ]
                    },
                    { name: 'Wings Bar', diets: [], allergens: [ 'gluten', 'soy' ] }
                  ]
            },
            { day: null, mealtime: 'dinner', mitems: [ { name: '', diets: [], allergens: [] } ] },
            {
                day: 'thursday',
                mealtime: 'lunch',
                mitems: [        
                    {      
                      name: 'Mashed Potatoes',
                      diets: [ 'vegetarian' ],
                      allergens: [ 'dairy' ]
                    },
                    {
                      name: 'Psari Plaki Fish',
                      diets: [],
                      allergens: [ 'gluten', 'soy', 'fish' ]
                    },
                    { name: 'Ropa Vieja', diets: [], allergens: [ 'soy' ] },
                    {
                      name: 'Black Beans with Plantains',
                      diets: [ 'vegan' ],
                      allergens: [ 'soy' ]
                    },
                    {
                      name: 'Chicken Parmesan',
                      diets: [],
                      allergens: [ 'gluten', 'soy', 'dairy', 'eggs' ]
                    },
                    {
                      name: 'Garlic Butter Shrimp',
                      diets: [],
                      allergens: [ 'soy', 'shellfish' ]
                    },
                    { name: 'Beef Bibimbap', diets: [], allergens: [ 'soy' ] }
                  ]
            },
            { day: null, mealtime: 'dinner', mitems: [ { name: '', diets: [], allergens: [] } ] },
            {
                day: 'friday',
                mealtime: 'lunch',
                mitems: [        
                    {      
                      name: 'Shrimp Biryani',
                      diets: [],
                      allergens: [ 'gluten', 'soy', 'shellfish' ]
                    },
                    {
                      name: 'Moroccan Chicken',
                      diets: [ 'halal' ],
                      allergens: [ 'soy' ]
                    },
                    { name: 'Ginger & Turmeric Rice', diets: [ 'vegan' ], allergens: [] },
                    { name: 'Black Beans & Rice', diets: [ 'vegan' ], allergens: [] },
                    { name: 'Kalua Pork', diets: [], allergens: [ 'soy' ] },
                    {
                      name: 'Frito Pie',
                      diets: [],
                      allergens: [ 'gluten', 'soy', 'dairy' ]
                    },
                    { name: 'Jerk Chicken', diets: [], allergens: [ 'soy' ] }
                  ]
            },
            { day: null, mealtime: 'dinner', mitems: [ { name: '', diets: [], allergens: [] } ] },
            { day: 'saturday', mealtime: 'lunch', mitems: [ { name: '', diets: [], allergens: [] } ] },
            { day: null, mealtime: 'dinner', mitems: [ { name: '', diets: [], allergens: [] } ] },
            { day: 'sunday', mealtime: 'lunch', mitems: [ { name: '', diets: [], allergens: [] } ] },
            { day: null, mealtime: 'dinner', mitems: [ { name: '', diets: [], allergens: [] } ] }
        ]); 
    })
});