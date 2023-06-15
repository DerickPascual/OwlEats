const { filterDiets, filterAllergens, createTxtMenu, createTxtBody } = require('./textCreator');

describe('filterDiets tests', () => {
    describe('Average menus case. One item is vegan, one item is vegetarian, one is halal.', () => {

        const menu = [
            {
                name: 'Buttered Curry Chicken Thighs',
                diets: ['halal'],
                allergens: ['soy', 'dairy']
            },
            { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
            {
                name: 'Saag Paneer',
                diets: ['vegetarian'],
                allergens: ['dairy']
            },
            { name: 'White Bean Loubia', diets: ['vegan'], allergens: [] },
            {
                name: 'Chicken Potstickers',
                diets: [],
                allergens: ['gluten', 'soy', 'sesame']
            },
            {
                name: 'Fried Chicken Taquitos',
                diets: [],
                allergens: ['gluten', 'soy']
            },
            { name: 'Breaded Chicken Sliders', diets: [], allergens: [] }
        ];

        test('userDiets is empty', () => {
            expect(filterDiets(menu, [])).toStrictEqual(menu);
        });

        test('userDiets contains vegan', () => {
            expect(filterDiets(menu, ['vegan'])).toStrictEqual([
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                { name: 'White Bean Loubia', diets: ['vegan'], allergens: [] }
            ]);
        })

        test('userDiets contains vegetarian', () => {
            expect(filterDiets(menu, ['vegetarian'])).toStrictEqual([
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                { name: 'Saag Paneer', diets: ['vegetarian'], allergens: ['dairy'] },
                { name: 'White Bean Loubia', diets: ['vegan'], allergens: [] },
            ]);
        });

        test('userDiets contains halal', () => {
            expect(filterDiets(menu, ['halal'])).toStrictEqual([
                {
                    name: 'Buttered Curry Chicken Thighs',
                    diets: ['halal'],
                    allergens: ['soy', 'dairy']
                }
            ]);
        });

        test(('userDiets contains vegetarian and vegan'), () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan'])).toStrictEqual([
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                { name: 'White Bean Loubia', diets: ['vegan'], allergens: [] },
            ]);
        });

        test(('userDiets contains vegetarian and halal'), () => {
            expect(filterDiets(menu, ['vegetarian', 'halal'])).toStrictEqual([]);
        });

        test(('userDiets contains vegan and halal'), () => {
            expect(filterDiets(menu, ['vegan', 'halal'])).toStrictEqual([]);
        });

        test('userDiets contains vegan, vegetarian, and halal', () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan', 'halal'])).toStrictEqual([]);
        });
    });

    describe('Menu contains items with no diet tags', () => {
        const menu = [
            {
                name: 'Buttered Curry Chicken Thighs',
                diets: [],
                allergens: ['soy', 'dairy']
            },
            { name: 'Almond Craisin Rice', diets: [], allergens: [] },
            {
                name: 'Saag Paneer',
                diets: [],
                allergens: ['dairy']
            },
            { name: 'White Bean Loubia', diets: [], allergens: [] },
            {
                name: 'Chicken Potstickers',
                diets: [],
                allergens: ['gluten', 'soy', 'sesame']
            },
            {
                name: 'Fried Chicken Taquitos',
                diets: [],
                allergens: ['gluten', 'soy']
            },
            { name: 'Breaded Chicken Sliders', diets: [], allergens: [] }
        ];

        test('userDiets is empty', () => {
            expect(filterDiets(menu, [])).toStrictEqual(menu);
        });

        test('userDiets contains vegan', () => {
            expect(filterDiets(menu, ['vegan'])).toStrictEqual([]);
        })

        test('userDiets contains vegetarian', () => {
            expect(filterDiets(menu, ['vegetarian'])).toStrictEqual([]);
        });

        test('userDiets contains halal', () => {
            expect(filterDiets(menu, ['halal'])).toStrictEqual([]);
        });

        test(('userDiets contains vegetarian and vegan'), () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan'])).toStrictEqual([]);
        });

        test(('userDiets contains vegetarian and halal'), () => {
            expect(filterDiets(menu, ['vegetarian', 'halal'])).toStrictEqual([]);
        });

        test(('userDiets contains vegan and halal'), () => {
            expect(filterDiets(menu, ['vegan', 'halal'])).toStrictEqual([]);
        });

        test('userDiets contains vegan, vegetarian, and halal', () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan', 'halal'])).toStrictEqual([]);
        });
    });

    describe('Menu contains items with multiple diet tags', () => {
        const menu = [
            {
                name: 'Buttered Curry',
                diets: ['halal', 'vegetarian'],
                allergens: ['soy', 'dairy']
            },
            { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
            {
                name: 'Saag Paneer',
                diets: ['vegan', 'halal'],
                allergens: ['dairy']
            },
            { name: 'White Bean Loubia', diets: ['vegetarian'], allergens: [] },
            {
                name: 'Chicken Potstickers',
                diets: [],
                allergens: ['gluten', 'soy', 'sesame']
            },
            {
                name: 'Vegetable Samosas',
                diets: ['halal', 'vegan'],
                allergens: ['gluten', 'soy']
            },
            { name: 'Breaded Chicken Sliders', diets: [], allergens: [] }
        ];

        test('userDiets is empty', () => {
            expect(filterDiets(menu, [])).toStrictEqual(menu);
        });

        test('userDiets contains vegan', () => {
            expect(filterDiets(menu, ['vegan'])).toStrictEqual([
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                {
                    name: 'Saag Paneer',
                    diets: ['vegan', 'halal'],
                    allergens: ['dairy']
                },
                {
                    name: 'Vegetable Samosas',
                    diets: ['halal', 'vegan'],
                    allergens: ['gluten', 'soy']
                }
            ]);
        })

        test('userDiets contains vegetarian', () => {
            expect(filterDiets(menu, ['vegetarian'])).toStrictEqual([
                {
                    name: 'Buttered Curry',
                    diets: ['halal', 'vegetarian'],
                    allergens: ['soy', 'dairy']
                },
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                {
                    name: 'Saag Paneer',
                    diets: ['vegan', 'halal'],
                    allergens: ['dairy']
                },
                { name: 'White Bean Loubia', diets: ['vegetarian'], allergens: [] },
                {
                    name: 'Vegetable Samosas',
                    diets: ['halal', 'vegan'],
                    allergens: ['gluten', 'soy']
                }
            ]);
        });

        test('userDiets contains halal', () => {
            expect(filterDiets(menu, ['halal'])).toStrictEqual([
                {
                    name: 'Buttered Curry',
                    diets: ['halal', 'vegetarian'],
                    allergens: ['soy', 'dairy']
                },
                {
                    name: 'Saag Paneer',
                    diets: ['vegan', 'halal'],
                    allergens: ['dairy']
                },
                {
                    name: 'Vegetable Samosas',
                    diets: ['halal', 'vegan'],
                    allergens: ['gluten', 'soy']
                }
            ]);
        });

        test(('userDiets contains vegetarian and vegan'), () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan'])).toStrictEqual([
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                {
                    name: 'Saag Paneer',
                    diets: ['vegan', 'halal'],
                    allergens: ['dairy']
                },
                {
                    name: 'Vegetable Samosas',
                    diets: ['halal', 'vegan'],
                    allergens: ['gluten', 'soy']
                }
            ]);
        });

        test(('userDiets contains vegetarian and halal'), () => {
            expect(filterDiets(menu, ['vegetarian', 'halal'])).toStrictEqual([
                {
                    name: 'Buttered Curry',
                    diets: ['halal', 'vegetarian'],
                    allergens: ['soy', 'dairy']
                },
                {
                    name: 'Saag Paneer',
                    diets: ['vegan', 'halal'],
                    allergens: ['dairy']
                },
                {
                    name: 'Vegetable Samosas',
                    diets: ['halal', 'vegan'],
                    allergens: ['gluten', 'soy']
                }
            ]);
        });

        test(('userDiets contains vegan and halal'), () => {
            expect(filterDiets(menu, ['vegan', 'halal'])).toStrictEqual([
                {
                    name: 'Saag Paneer',
                    diets: ['vegan', 'halal'],
                    allergens: ['dairy']
                },
                {
                    name: 'Vegetable Samosas',
                    diets: ['halal', 'vegan'],
                    allergens: ['gluten', 'soy']
                }
            ]);
        });

        test('userDiets contains vegan, vegetarian, and halal', () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan', 'halal'])).toStrictEqual([
                {
                    name: 'Saag Paneer',
                    diets: ['vegan', 'halal'],
                    allergens: ['dairy']
                },
                {
                    name: 'Vegetable Samosas',
                    diets: ['halal', 'vegan'],
                    allergens: ['gluten', 'soy']
                }
            ]);
        });
    });

    describe('Menus is empty', () => {

        const menu = [];

        test('userDiets is empty', () => {
            expect(filterDiets(menu, [])).toStrictEqual(menu);
        });

        test('userDiets contains vegan', () => {
            expect(filterDiets(menu, ['vegan'])).toStrictEqual([]);
        })

        test('userDiets contains vegetarian', () => {
            expect(filterDiets(menu, ['vegetarian'])).toStrictEqual([]);
        });

        test('userDiets contains halal', () => {
            expect(filterDiets(menu, ['halal'])).toStrictEqual([]);
        });

        test(('userDiets contains vegetarian and vegan'), () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan'])).toStrictEqual([]);
        });

        test(('userDiets contains vegetarian and halal'), () => {
            expect(filterDiets(menu, ['vegetarian', 'halal'])).toStrictEqual([]);
        });

        test(('userDiets contains vegan and halal'), () => {
            expect(filterDiets(menu, ['vegan', 'halal'])).toStrictEqual([]);
        });

        test('userDiets contains vegan, vegetarian, and halal', () => {
            expect(filterDiets(menu, ['vegetarian', 'vegan', 'halal'])).toStrictEqual([]);
        });
    });
});

describe('filterAllergens tests', () => {

    describe('Average case where menus has elements', () => {
        const menu = [
            {
                name: 'Buttered Curry Chicken Thighs',
                diets: ['halal'],
                allergens: ['soy', 'dairy']
            },
            { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
            {
                name: 'Saag Paneer',
                diets: ['vegetarian'],
                allergens: ['dairy']
            },
            { name: 'White Bean Loubia', diets: ['vegan'], allergens: [] },
            {
                name: 'Chicken Potstickers',
                diets: [],
                allergens: ['gluten', 'soy', 'sesame']
            },
            {
                name: 'Fried Chicken Taquitos',
                diets: [],
                allergens: ['gluten', 'soy']
            },
            { name: 'Breaded Chicken Sliders', diets: [], allergens: [] }
        ];

        test('User allergens is empty', () => {
            expect(filterAllergens(menu, [])).toStrictEqual(menu);
        });

        test('User has an allergen and menu has items with that allergen', () => {
            expect(filterAllergens(menu, ['dairy'])).toStrictEqual([
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                { name: 'White Bean Loubia', diets: ['vegan'], allergens: [] },
                {
                    name: 'Chicken Potstickers',
                    diets: [],
                    allergens: ['gluten', 'soy', 'sesame']
                },
                {
                    name: 'Fried Chicken Taquitos',
                    diets: [],
                    allergens: ['gluten', 'soy']
                },
                { name: 'Breaded Chicken Sliders', diets: [], allergens: [] }
            ]);
        });

        test('User has an allergen and menu does not contain items with that allergen', () => {
            expect(filterAllergens(menu, ['peanuts'])).toStrictEqual(menu);
        });

        test('User has multiple allergens and menu contains items with those allergens', () => {
            expect(filterAllergens(menu, ['sesame', 'soy'])).toStrictEqual([
                { name: 'Almond Craisin Rice', diets: ['vegan'], allergens: [] },
                {
                    name: 'Saag Paneer',
                    diets: ['vegetarian'],
                    allergens: ['dairy']
                },
                { name: 'White Bean Loubia', diets: ['vegan'], allergens: [] },
                { name: 'Breaded Chicken Sliders', diets: [], allergens: [] }
            ])
        });
    });

    describe('Case where menus is empty', () => {
        const menu = [];

        test('User allergens is empty', () => {
            expect(filterAllergens(menu, [])).toStrictEqual(menu);
        });
    
        test('User has an allergen', () => {
            expect(filterAllergens(menu, ['dairy'])).toStrictEqual([]);
        });
    
        test('User has multiple allergens', () => {
            expect(filterAllergens(menu, ['sesame', 'soy'])).toStrictEqual([])
        });
    })

});

describe('createTxtMenu tests', () => {
    test('Average case with items', () => {
        const mitemNames = ['Almond Craisin Rice', 'Saag Paneer', 'White Bean Loubia', 'Breaded Chicken Sliders'];
        expect(createTxtMenu(mitemNames, 'NoRtH')).toBe('----NORTH----\nAlmond Craisin Rice,\nSaag Paneer,\nWhite Bean Loubia,\nBreaded Chicken Sliders.\n');
    });

    test('Case with no items', () => {
        expect(createTxtMenu([], 'north')).toBe('----NORTH----\nNo menu items today.\n');
    });

    test('Case with one item', () => {
        expect(createTxtMenu(['Cheese Pizza'], 'north')).toBe('----NORTH----\nCheese Pizza.\n');
    });
});

describe('createTxtBody tests', () => {
    test('createTxtBody does not include any other servery names except those in userServs', () => {
        const menus = {
            north: [],
            west: [],
            south: [],
            seibel: [],
            baker: []
        };

        const txtBody = createTxtBody(menus, ['north'], [], []);

        expect(txtBody.includes('WEST') || txtBody.includes('SOUTH') || txtBody.includes('SEIBEL') || txtBody.includes('BAKER')).toBe(false);
    });
});