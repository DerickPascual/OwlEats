const { parseItems, formatTxtSingleMenu } = require('./textCreator.js');

describe('parseItems function tests', () => {
    describe('Single servery menu has day and items', () => {
        const menu =[
            {
                day: 'MONDAY',
                mealtime: 'LUNCH',
                mitems: [
                    { name: 'Cheese pizza', allergens: ['dairy'] }, 
                    { name: 'Pepperoni pizza', allergens: ['dairy']},
                    { name: 'Dairy-free Ice cream', allergens: ['gluten'] }
                ]
            }, 
            {
                day: 'TUESDAY',
                mealtime: 'LUNCH',
                mitems: [
                    { name: 'Cheese pizza', allergens: ['dairy'] }, 
                    { name: 'Pepperoni pizza', allergens: ['dairy']},
                    { name: 'Dairy-free Ice cream', allergens: ['gluten'] }
                ]
            },
            {
                day: 'WEDNESDAY',
                mealtime: 'LUNCH',
                mitems: [
                    { name: 'Cheese pizza', allergens: ['dairy'] }, 
                    { name: 'Pepperoni pizza', allergens: ['dairy']},
                    { name: 'Dairy-free Ice cream', allergens: ['gluten'] }
                ]
            },
            {
                day: 'THURSDAY',
                mealtime: 'LUNCH',
                mitems: [
                    { name: 'Cheese pizza', allergens: ['dairy'] }, 
                    { name: 'Pepperoni pizza', allergens: ['dairy']},
                    { name: 'Dairy-free Ice cream', allergens: ['gluten'] }
                ]
            },
            {
                day: 'FRIDAY',
                mealtime: 'LUNCH',
                mitems: [
                    { name: 'Cheese pizza', allergens: ['dairy'] }, 
                    { name: 'Pepperoni pizza', allergens: ['dairy']},
                    { name: 'Dairy-free Ice cream', allergens: ['gluten'] }
                ]
            }, {
                day: 'SATURDAY',
                mealtime: 'LUNCH',
                mitems: [
                    { name: 'Cheese pizza', allergens: ['dairy'] }, 
                    { name: 'Pepperoni pizza', allergens: ['dairy']},
                    { name: 'Dairy-free Ice cream', allergens: ['gluten'] }
                ]
            },
            {
                day: 'SUNDAY',
                mealtime: 'LUNCH',
                mitems: [
                    { name: 'Cheese pizza', allergens: ['dairy'] }, 
                    { name: 'Pepperoni pizza', allergens: ['dairy']},
                    { name: 'Dairy-free Ice cream', allergens: ['gluten'] }
                ]
            }
        ];

        test('input has no allergens', () =>  {
            expect(parseItems(menu, 'lunch')).toStrictEqual(['Cheese pizza', 'Pepperoni pizza', 'Dairy-free Ice cream']);
        });

        test('input has dairy allergen', () => {
            expect(parseItems(menu, 'lunch', ['dairy'])).toStrictEqual(['Dairy-free Ice cream']);
        });

        test('input has gluten allergen', () => {
            expect(parseItems(menu, 'lunch', ['gluten'])).toStrictEqual(['Cheese pizza', 'Pepperoni pizza']);
        });
    });

    describe('Single servery menu has no menu items', () => {
        const menu =[
            {
                day: 'MONDAY',
                mealtime: 'LUNCH',
                mitems: []
            }, 
            {
                day: 'TUESDAY',
                mealtime: 'LUNCH',
                mitems: []
            },
            {
                day: 'WEDNESDAY',
                mealtime: 'LUNCH',
                mitems: []
            },
            {
                day: 'THURSDAY',
                mealtime: 'LUNCH',
                mitems: []
            },
            {
                day: 'FRIDAY',
                mealtime: 'LUNCH',
                mitems: []
            }, {
                day: 'SATURDAY',
                mealtime: 'LUNCH',
                mitems: []
            },
            {
                day: 'SUNDAY',
                mealtime: 'LUNCH',
                mitems: []
            }
        ];

        test('input has no allergens', () => {
            expect(parseItems(menu, 'lunch')).toStrictEqual([]);
        });

        test('input has allergens', () => {
            expect(parseItems(menu, 'lunch', ['dairy', 'gluten', 'vegan'])).toStrictEqual([]);
        });
    });
});

describe('createTxtSingleMenu function tests', () => {
    describe('items has items', () => {
        const items = ['Cheese pizza', 'Pepperoni pizza', 'Ice cream'];
        expect(formatTxtSingleMenu('north', items)).toBe('----NORTH----\nCheese pizza,\nPepperoni pizza,\nIce cream.\n')
    });

    describe('items has no items', () => {
        const items = [];
        expect(formatTxtSingleMenu('north', items)).toBe('----NORTH----\nClosed.\n');
    });
});