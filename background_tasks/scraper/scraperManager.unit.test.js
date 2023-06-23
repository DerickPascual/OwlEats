const { filterMitems, restructureMenus, getMenus } = require('./scraperManager');
const path = require('path');

describe('filterMitems tests', () => {
  test("mitems don't need to be filtered", () => {
    const mitems = [
      { name: 'Chicken Tagine', diets: ['halal'], allergens: [] },
      { name: 'Okra Stew', diets: [], allergens: ['soy'] },
      { name: 'Fish Malabar', diets: [], allergens: ['soy', 'fish'] },
      { name: 'Chicken Adobo', diets: [], allergens: ['soy'] },
      { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
      { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
      { name: 'Beef Chimichurri', diets: [], allergens: [] }
    ];

    const fitered = filterMitems(mitems);
    expect(filtered).toStrictEqual(mitems);
  });

  test("mitems has an &amp;", () => {
    const mitems = [
      { name: 'Chicken Tagine', diets: ['halal'], allergens: [] },
      { name: 'Okra Stew & Chicken', diets: [], allergens: ['soy'] },
      { name: 'Fish & Cod Malabar', diets: [], allergens: ['soy', 'fish'] },
      { name: 'Chicken Adobo', diets: [], allergens: ['soy'] },
      { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
      { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
      { name: 'Beef Chimichurri', diets: [], allergens: [] }
    ];

    const filtered = filterMitems(mitems);

    expect(filtered).toStrictEqual([
      { name: 'Chicken Tagine', diets: ['halal'], allergens: [] },
      { name: 'Okra Stew & Chicken', diets: [], allergens: ['soy'] },
      { name: 'Fish & Cod Malabar', diets: [], allergens: ['soy', 'fish'] },
      { name: 'Chicken Adobo', diets: [], allergens: ['soy'] },
      { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
      { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
      { name: 'Beef Chimichurri', diets: [], allergens: [] }
    ]);
  });

  test("mitems need to be filtered", () => {
    const mitems = [
      { name: '', diets: ['halal'], allergens: [] },
      { name: 'Okra Stew', diets: [], allergens: ['soy'] },
      { name: 'Fish Malabar', diets: [], allergens: ['soy', 'fish'] },
      { name: '', diets: [], allergens: ['soy'] },
      { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
      { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
      { name: '', diets: [], allergens: [] }
    ];

    const filtered = filterMitems(mitems);

    expect(filtered).toStrictEqual([
      { name: 'Okra Stew', diets: [], allergens: ['soy'] },
      { name: 'Fish Malabar', diets: [], allergens: ['soy', 'fish'] },
      { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
      { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
    ]);
  });

  test('single mitem needs to be filtered', () => {

  })
});

describe('restructureMenus tests', () => {
  test('Edge case where menus are empty, but need to filter', () => {
    const menu = [
      { day: 'monday', mealtime: 'lunch', mitems: [] },
      { day: 'monday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      { day: 'tuesday', mealtime: 'lunch', mitems: [] },
      { day: 'tuesday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      { day: 'wednesday', mealtime: 'lunch', mitems: [] },
      { day: 'wednesday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      { day: 'thursday', mealtime: 'lunch', mitems: [] },
      { day: 'thursday', mealtime: 'dinner', mitems: [] },
      { day: 'friday', mealtime: 'lunch', mitems: [] },
      { day: 'friday', mealtime: 'dinner', mitems: [] },
      { day: 'saturday', mealtime: 'lunch', mitems: [] },
      { day: 'saturday', mealtime: 'dinner', mitems: [] },
      { day: 'sunday', mealtime: 'lunch', mitems: [] },
      { day: 'sunday', mealtime: 'dinner', mitems: [] }
    ];

    const restructured = restructureMenus(menu);

    expect(restructured).toStrictEqual({
      monday: { lunch: [], dinner: [] },
      tuesday: { lunch: [], dinner: [] },
      wednesday: { lunch: [], dinner: [] },
      thursday: { lunch: [], dinner: [] },
      friday: { lunch: [], dinner: [] },
      saturday: { lunch: [], dinner: [] },
      sunday: { lunch: [], dinner: [] }
    });
  });

  test("Average case where menus are full, some filtering, some %amp;", () => {
    const menu = [
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
      { day: 'monday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      {
        day: 'tuesday',
        mealtime: 'lunch',
        mitems: [
          {
            name: 'Seafood Cioppino',
            diets: [],
            allergens: ['gluten', 'soy', 'fish', 'shellfish']
          },
          { name: 'Paella Rice', diets: ['vegan'], allergens: [] },
          {
            name: 'Chicken Pho',
            diets: ['halal'],
            allergens: ['gluten', 'soy']
          },
          { name: 'Refried Beans', diets: ['vegan'], allergens: [] },
          {
            name: 'Coconut Curry Chicken',
            diets: [],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Shrimp Pad Thai',
            diets: [],
            allergens: ['gluten', 'soy', 'eggs', 'fish', 'shellfish']
          },
          {
            name: 'Chicken Stuffed Poblano',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ]
      },
      { day: 'tuesday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      {
        day: 'wednesday',
        mealtime: 'lunch',
        mitems: [
          {
            name: 'Falafel',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          },
          { name: "Shepperd's Pie", diets: [], allergens: ['soy', 'dairy'] },
          { name: 'Pozole', diets: [], allergens: ['soy'] },
          { name: 'Kings Casserole', diets: [], allergens: ['dairy'] },
          { name: 'Red Curry Cod', diets: [], allergens: ['gluten', 'fish'] },
          {
            name: 'Lamb &amp; Beef Gyro with Tzatziki',
            diets: ['halal'],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Wings Bar', diets: [], allergens: ['gluten', 'soy'] }
        ]
      },
      { day: 'wednesday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      {
        day: 'thursday',
        mealtime: 'lunch',
        mitems: [
          {
            name: 'Mashed Potatoes',
            diets: ['vegetarian'],
            allergens: ['dairy']
          },
          {
            name: 'Psari Plaki Fish',
            diets: [],
            allergens: ['gluten', 'soy', 'fish']
          },
          { name: 'Ropa Vieja', diets: [], allergens: ['soy'] },
          {
            name: 'Black Beans with Plantains',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Chicken Parmesan',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Garlic Butter Shrimp',
            diets: [],
            allergens: ['soy', 'shellfish']
          },
          { name: 'Beef Bibimbap', diets: [], allergens: ['soy'] }
        ]
      },
      { day: 'thursday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      {
        day: 'friday',
        mealtime: 'lunch',
        mitems: [
          {
            name: 'Shrimp Biryani',
            diets: [],
            allergens: ['gluten', 'soy', 'shellfish']
          },
          {
            name: 'Moroccan Chicken',
            diets: ['halal'],
            allergens: ['soy']
          },
          { name: 'Ginger & Turmeric Rice', diets: ['vegan'], allergens: [] },
          { name: 'Black Beans & Rice', diets: ['vegan'], allergens: [] },
          { name: 'Kalua Pork', diets: [], allergens: ['soy'] },
          {
            name: 'Frito Pie',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Jerk Chicken', diets: [], allergens: ['soy'] }
        ]
      },
      { day: 'friday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      { day: 'saturday', mealtime: 'lunch', mitems: [{ name: '', diets: [], allergens: [] }] },
      { day: 'saturday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] },
      { day: 'sunday', mealtime: 'lunch', mitems: [{ name: '', diets: [], allergens: [] }] },
      { day: 'sunday', mealtime: 'dinner', mitems: [{ name: '', diets: [], allergens: [] }] }
    ];

    const restructured = restructureMenus(menu);

    expect(restructured).toStrictEqual({
      monday: {
        lunch: [
          { name: 'Chicken Tagine', diets: ['halal'], allergens: [] },
          { name: 'Okra Stew', diets: [], allergens: ['soy'] },
          { name: 'Fish Malabar', diets: [], allergens: ['soy', 'fish'] },
          { name: 'Chicken Adobo', diets: [], allergens: ['soy'] },
          { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
          { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
          { name: 'Beef Chimichurri', diets: [], allergens: [] }
        ],
        dinner: []
      },
      tuesday: {
        lunch: [
          {
            name: 'Seafood Cioppino',
            diets: [],
            allergens: ['gluten', 'soy', 'fish', 'shellfish']
          },
          { name: 'Paella Rice', diets: ['vegan'], allergens: [] },
          {
            name: 'Chicken Pho',
            diets: ['halal'],
            allergens: ['gluten', 'soy']
          },
          { name: 'Refried Beans', diets: ['vegan'], allergens: [] },
          {
            name: 'Coconut Curry Chicken',
            diets: [],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Shrimp Pad Thai',
            diets: [],
            allergens: ['gluten', 'soy', 'eggs', 'fish', 'shellfish']
          },
          {
            name: 'Chicken Stuffed Poblano',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ],
        dinner: []
      },
      wednesday: {
        lunch: [
          {
            name: 'Falafel',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          },
          { name: "Shepperd's Pie", diets: [], allergens: ['soy', 'dairy'] },
          { name: 'Pozole', diets: [], allergens: ['soy'] },
          { name: 'Kings Casserole', diets: [], allergens: ['dairy'] },
          { name: 'Red Curry Cod', diets: [], allergens: ['gluten', 'fish'] },
          {
            name: 'Lamb & Beef Gyro with Tzatziki',
            diets: ['halal'],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Wings Bar', diets: [], allergens: ['gluten', 'soy'] }
        ],
        dinner: []
      },
      thursday: {
        lunch: [
          {
            name: 'Mashed Potatoes',
            diets: ['vegetarian'],
            allergens: ['dairy']
          },
          {
            name: 'Psari Plaki Fish',
            diets: [],
            allergens: ['gluten', 'soy', 'fish']
          },
          { name: 'Ropa Vieja', diets: [], allergens: ['soy'] },
          {
            name: 'Black Beans with Plantains',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Chicken Parmesan',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Garlic Butter Shrimp',
            diets: [],
            allergens: ['soy', 'shellfish']
          },
          { name: 'Beef Bibimbap', diets: [], allergens: ['soy'] }
        ],
        dinner: []
      },
      friday: {
        lunch: [
          {
            name: 'Shrimp Biryani',
            diets: [],
            allergens: ['gluten', 'soy', 'shellfish']
          },
          {
            name: 'Moroccan Chicken',
            diets: ['halal'],
            allergens: ['soy']
          },
          { name: 'Ginger & Turmeric Rice', diets: ['vegan'], allergens: [] },
          { name: 'Black Beans & Rice', diets: ['vegan'], allergens: [] },
          { name: 'Kalua Pork', diets: [], allergens: ['soy'] },
          {
            name: 'Frito Pie',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Jerk Chicken', diets: [], allergens: ['soy'] }
        ],
        dinner: []
      },
      saturday: { lunch: [], dinner: [] },
      sunday: { lunch: [], dinner: [] }
    });
  });
});

describe('getMenus tests', () => {
  test('Case with meals, nameless items', async () => {
    const menu = await getMenus('file://' + path.join(__dirname, 'mock_pages', 'northMenus_6_13_23.html'));
    expect(menu).toStrictEqual({
      monday: {
        lunch: [
          { name: 'Chicken Tagine', diets: ['halal'], allergens: [] },
          { name: 'Okra Stew', diets: [], allergens: ['soy'] },
          { name: 'Fish Malabar', diets: [], allergens: ['soy', 'fish'] },
          { name: 'Chicken Adobo', diets: [], allergens: ['soy'] },
          { name: 'Herb Roasted Potatoes', diets: ['vegan'], allergens: [] },
          { name: 'Global Bowl Tostada Bar', diets: [], allergens: ['soy', 'dairy'] },
          { name: 'Beef Chimichurri', diets: [], allergens: [] }
        ],
        dinner: []
      },
      tuesday: {
        lunch: [
          {
            name: 'Seafood Cioppino',
            diets: [],
            allergens: ['gluten', 'soy', 'fish', 'shellfish']
          },
          { name: 'Paella Rice', diets: ['vegan'], allergens: [] },
          {
            name: 'Chicken Pho',
            diets: ['halal'],
            allergens: ['gluten', 'soy']
          },
          { name: 'Refried Beans', diets: ['vegan'], allergens: [] },
          {
            name: 'Coconut Curry Chicken',
            diets: [],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Shrimp Pad Thai',
            diets: [],
            allergens: ['gluten', 'soy', 'eggs', 'fish', 'shellfish']
          },
          {
            name: 'Chicken Stuffed Poblano',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ],
        dinner: []
      },
      wednesday: {
        lunch: [
          {
            name: 'Falafel',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          },
          { name: "Shepperd's Pie", diets: [], allergens: ['soy', 'dairy'] },
          { name: 'Pozole', diets: [], allergens: ['soy'] },
          { name: 'Kings Casserole', diets: [], allergens: ['dairy'] },
          { name: 'Red Curry Cod', diets: [], allergens: ['gluten', 'fish'] },
          {
            name: 'Lamb & Beef Gyro with Tzatziki',
            diets: ['halal'],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Wings Bar', diets: [], allergens: ['gluten', 'soy'] }
        ],
        dinner: []
      },
      thursday: {
        lunch: [
          {
            name: 'Mashed Potatoes',
            diets: ['vegetarian'],
            allergens: ['dairy']
          },
          {
            name: 'Psari Plaki Fish',
            diets: [],
            allergens: ['gluten', 'soy', 'fish']
          },
          { name: 'Ropa Vieja', diets: [], allergens: ['soy'] },
          {
            name: 'Black Beans with Plantains',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Chicken Parmesan',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Garlic Butter Shrimp',
            diets: [],
            allergens: ['soy', 'shellfish']
          },
          { name: 'Beef Bibimbap', diets: [], allergens: ['soy'] }
        ],
        dinner: []
      },
      friday: {
        lunch: [
          {
            name: 'Shrimp Biryani',
            diets: [],
            allergens: ['gluten', 'soy', 'shellfish']
          },
          {
            name: 'Moroccan Chicken',
            diets: ['halal'],
            allergens: ['soy']
          },
          { name: 'Ginger & Turmeric Rice', diets: ['vegan'], allergens: [] },
          { name: 'Black Beans & Rice', diets: ['vegan'], allergens: [] },
          { name: 'Kalua Pork', diets: [], allergens: ['soy'] },
          {
            name: 'Frito Pie',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Jerk Chicken', diets: [], allergens: ['soy'] }
        ],
        dinner: []
      },
      saturday: { lunch: [], dinner: [] },
      sunday: { lunch: [], dinner: [] }
    });
  });

  test("Average case with full menus", async () => {
    const menu = await getMenus('file://' + path.join(__dirname, 'mock_pages', 'southMenus_6_13_23.html'));

    expect(menu).toStrictEqual({
      monday: {
        lunch: [
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
        ],
        dinner: [
          { name: 'Moroccan Fish', diets: [], allergens: ['soy', 'fish'] },
          { name: 'Yellow Rice', diets: ['vegan'], allergens: [] },
          {
            name: 'Zaatar Spiced Tofu',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Stuffed Pasta Shells Marinara',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          { name: 'Chickpea Masala', diets: ['vegan'], allergens: [] },
          {
            name: 'Pepperoni Pizza',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Chicken with Mole Sauce', diets: [], allergens: ['soy'] },
          {
            name: 'Cheese Pizza',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ]
      },
      tuesday: {
        lunch: [
          {
            name: 'Baked Chicken, Lemon Caper Vinaigrette',
            diets: [],
            allergens: ['soy']
          },
          {
            name: 'Chimichurri Potatoes',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Spicy Lentil Masala',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Cheese Enchiladas',
            diets: ['vegetarian'],
            allergens: ['soy', 'dairy']
          },
          {
            name: 'BBQ Chicken & Red Onion Pizza',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          {
            name: 'Vegetable Egg Rolls',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'eggs', 'sesame']
          },
          { name: 'Beef Sliders', diets: [], allergens: [] }
        ],
        dinner: [
          { name: 'Turmeric Curry Beef', diets: [], allergens: ['soy'] },
          { name: 'Saffron Rice Pilaf', diets: ['vegan'], allergens: [] },
          {
            name: 'Baked Fish, Jalapeno Cream Sauce',
            diets: [],
            allergens: ['soy', 'fish']
          },
          {
            name: 'Veggies & Noodles Stir Fry',
            diets: [],
            allergens: ['gluten', 'soy', 'sesame']
          },
          { name: 'Hoisin Tempeh', diets: ['vegan'], allergens: ['soy'] },
          {
            name: 'Supreme Italian Sausage Pizza',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ]
      },
      wednesday: {
        lunch: [
          {
            name: 'Chicken Skewers with Mango Chutney',
            diets: [],
            allergens: ['soy']
          },
          { name: 'Basmati Rice', diets: ['vegan'], allergens: [] },
          {
            name: 'Veggie Momo Dumplings',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Baked Cod Puttanesca',
            diets: [],
            allergens: ['soy', 'fish']
          },
          {
            name: 'Braised Chickpea Tagine',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Beef Franks with Chili & Cheese',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          {
            name: 'Supreme Mushroom & Veggie pizza',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ],
        dinner: [
          { name: 'Tomato Curry Chicken', diets: [], allergens: ['soy'] },
          { name: 'Lemon Rice', diets: ['vegan'], allergens: [] },
          {
            name: 'Vegetable Stir Fry',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Potato Gnocchi with Garlic Cream Sauce',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Baked Tofu with olive Tapenade',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Fried Eggplant, Tomato Relish',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Buffalo Chicken & Blue Cheese Pizzas',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ]
      },
      thursday: {
        lunch: [
          {
            name: 'Seared Harissa Chicken',
            diets: ['halal'],
            allergens: ['soy']
          },
          { name: 'Roasted Potato Medley', diets: ['vegan'], allergens: [] },
          {
            name: 'Palak Paneer',
            diets: ['vegetarian'],
            allergens: ['dairy']
          },
          { name: 'Beef Rogan Josh', diets: [], allergens: ['soy'] },
          { name: 'Chicken Teriyaki', diets: [], allergens: ['soy'] },
          {
            name: 'Pork Potstickers',
            diets: [],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Grilled Cheese Sandwiches',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ],
        dinner: [
          {
            name: 'Baked Fish, Cucumber Feta Slaw',
            diets: [],
            allergens: ['soy', 'fish']
          },
          { name: 'Golden Raisin Rice', diets: ['vegan'], allergens: [] },
          { name: 'White Bean Masala', diets: ['vegan'], allergens: [] },
          { name: 'Tofu Vindaloo', diets: ['vegan'], allergens: ['soy'] },
          {
            name: 'Chicken & Shitake Mushrooms',
            diets: [],
            allergens: ['soy']
          },
          {
            name: 'Vegetable Momo Dumplings',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Cheese Pizza',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy']
          },
          {
            name: 'Pepperoni Pizza',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          }
        ]
      },
      friday: {
        lunch: [
          {
            name: 'Sliced Pork Loin with Herb Honey Mustard',
            diets: [],
            allergens: ['soy']
          },
          {
            name: 'Couscous Vegetable Medley',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Mixed Vegetable Jalfrezi',
            diets: ['vegan'],
            allergens: []
          },
          {
            name: 'Goan Curry Tilapia',
            diets: [],
            allergens: ['soy', 'fish']
          },
          {
            name: 'Manchurian Glazed Air-Fried Tofu',
            diets: ['vegan'],
            allergens: ['soy']
          },
          { name: 'Gyro & Falafel Station', diets: [], allergens: [] },
          {
            name: 'Breaded Chicken Sliders',
            diets: [],
            allergens: ['gluten', 'soy']
          }
        ],
        dinner: [
          { name: 'Tomato Lemon Stewed Pork', diets: [], allergens: ['soy'] },
          { name: 'Wild Rice Pilaf', diets: ['vegan'], allergens: [] },
          { name: 'Okra Tomato Curry', diets: ['vegan'], allergens: [] },
          {
            name: 'Tandoori Chicken',
            diets: [],
            allergens: ['soy', 'dairy']
          },
          {
            name: 'Cheese Enchiladas',
            diets: ['vegetarian'],
            allergens: ['soy', 'dairy']
          },
          { name: 'Achiote Chicken', diets: [], allergens: [] },
          {
            name: 'Vegetable Momo Dumplings',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          }
        ]
      },
      saturday: {
        lunch: [
          {
            name: 'Beef Lasagna',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Wild Rice Pilaf', diets: ['vegan'], allergens: [] },
          {
            name: 'Braised Green Beans & Tomatoes',
            diets: ['vegan'],
            allergens: []
          },
          { name: 'Saag Tofu', diets: ['vegan'], allergens: ['soy'] },
          {
            name: 'Black Bean with Plantains',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Barbacoa with Pico de Gallo',
            diets: [],
            allergens: ['soy']
          },
          {
            name: 'Chicken Potstickers',
            diets: [],
            allergens: ['soy', 'sesame']
          }
        ],
        dinner: [
          {
            name: 'Fried Steak Fritters with Pepper Gravy',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Red & Gold Potato Medley',
            diets: ['vegan'],
            allergens: []
          },
          {
            name: 'BBQ Baked Beans with Tofu',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Shrimp Curry',
            diets: [],
            allergens: ['soy', 'shellfish']
          },
          { name: 'Naan', diets: [], allergens: [] },
          {
            name: 'Chicken Taquitos',
            diets: [],
            allergens: ['gluten', 'soy']
          },
          {
            name: 'Tortilla Crusted Tilapia',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy', 'eggs', 'fish']
          }
        ]
      },
      sunday: {
        lunch: [
          {
            name: 'Salisbury Steaks with Mushroom Demi',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Mashed Potatoes',
            diets: ['vegetarian'],
            allergens: ['dairy']
          },
          {
            name: 'White Beans, Portobello Mushroom, Balsamic Glaze',
            diets: ['vegan'],
            allergens: ['soy']
          },
          {
            name: 'Cheese Manicotti with marinara',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy']
          },
          { name: 'Gobi Matar', diets: ['vegan'], allergens: [] },
          {
            name: 'Coconut Shrimp Korma',
            diets: [],
            allergens: ['soy', 'shellfish']
          },
          { name: 'Beef Ropa Vieja', diets: [], allergens: ['soy'] }
        ],
        dinner: [
          {
            name: 'Chicken Lasagna',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Veggie Dirty Rice',
            diets: ['vegan'],
            allergens: ['soy']
          },
          { name: 'Red Beans & Okra Stew', diets: ['vegan'], allergens: [] },
          {
            name: 'Blackened Catfish with Pico de Gallo',
            diets: [],
            allergens: ['soy', 'fish']
          },
          {
            name: 'Chicken & Beef Meatball Kofta',
            diets: [],
            allergens: ['gluten', 'soy', 'dairy']
          },
          {
            name: 'Chipotle Sweet Corn Nuggets',
            diets: ['vegetarian'],
            allergens: ['gluten', 'soy', 'dairy', 'eggs']
          },
          {
            name: 'Teriyaki Tofu Bites',
            diets: ['vegan'],
            allergens: ['gluten', 'soy']
          }
        ]
      }
    });
  })
});