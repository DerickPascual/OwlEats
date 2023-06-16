const { menusAreNew } = require('./updateScheduler');

describe('menusAreNew tests', () => {
    describe('Menus are empty', () => {

        const oldWeeklyMenus = {
            north: [],
            west: [],
            south: [],
            seibel: [],
            baker: []
        };

        const newWeeklyMenus = {
            north: [],
            west: [],
            south: [],
            seibel: [],
            baker: []
        };

        test('onBreak is true', () => {
            expect(menusAreNew(oldWeeklyMenus, newWeeklyMenus, true)).toBe(false);
        });

        test('onBreak is false', () => {
            expect(menusAreNew(oldWeeklyMenus, newWeeklyMenus, false)).toBe(false);
        })
    });

    describe('South, north, are not empty', () => {
        const oldWeeklyMenus = {
            north: [ { monday: [ { name: 'Tomato ranch', allergens: [], diets: [] } ] } ],
            west: [],
            south: [ { monday: [ { name: 'Chipotle sauce', allergens: [], diets: [] } ] } ],
            seibel: [],
            baker: []
        };

        const newWeeklyMenus = {
            north: [ { monday: [ { name: 'Cheese Pizza', allergens: [], diets: [] } ] }],
            west: [],
            south: [ { monday: [ { name: 'Pepperoni Pizza', allergens: [], diets: [] } ] } ],
            seibel: [],
            baker: []
        };

        test('onBreak is true', () => {
            expect(menusAreNew(oldWeeklyMenus, newWeeklyMenus, true)).toBe(true);
        });

        test('onBreak is false', () => {
            expect(menusAreNew(oldWeeklyMenus, newWeeklyMenus, false)).toBe(false);
        });
    });

    describe('No menus are empty', () => {
        const oldWeeklyMenus = {
            north: [ { monday: [ { name: 'Tomato ranch', allergens: [], diets: [] } ] } ],
            west: [ { monday: [ { name: 'Applesauce pizza', allergens: [], diets: [] } ] } ],
            south: [ { monday: [ { name: 'Chipotle sauce', allergens: [], diets: [] } ] } ],
            seibel: [ { monday: [ { name: 'Mayonnaise Tuna', allergens: [], diets: [] } ] } ],
            baker: [ { monday: [ { name: 'Beet juice', allergens: [], diets: [] } ] } ]
        };

        const newWeeklyMenus = {
            north: [ { monday: [ { name: 'Cheese Pizza', allergens: [], diets: [] } ] } ],
            west: [ { monday: [ { name: 'Red sauce', allergens: [], diets: [] } ] } ],
            south: [ { monday: [ { name: 'Pepperoni Pizza', allergens: [], diets: [] } ] } ],
            seibel: [ { monday: [ { name: 'Peanut Butter Jelly Sandwich', allergens: [], diets: [] } ] } ],
            baker: [ { monday: [ { name: 'Teriyaki Chicken', allergens: [], diets: [] } ] } ]
        };

        test('onBreak is true', () => {
            expect(menusAreNew(oldWeeklyMenus, newWeeklyMenus, true)).toBe(true);
        });

        test('onBreak is false', () => {
            expect(menusAreNew(oldWeeklyMenus, newWeeklyMenus, false)).toBe(true);
        });
    });
});