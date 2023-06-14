const pool = require('./db');
const { getAllMenus } = require('../background_tasks/scraper/scraperManager');

// updates all menus and mealtimes of DB given the menu of all serveries we get from getAllMenus
const updateAllMenus = async (menus) => {
    const serveries = ['north', 'west', 'south', 'seibel', 'baker'];
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const mealtimes = ['lunch', 'dinner'];

    for (servery of serveries) {
        for (day of days) {
            for (mealtime of mealtimes) {
                await pool.query(`
                    UPDATE menus
                    SET ${servery} = $1
                    WHERE day = $2
                    AND mealtime = $3
                `, [JSON.stringify(menus[servery][day][mealtime]), day, mealtime])
                    .catch((err) => {
                        console.error;
                    })
            }
        }
    }
};

const updateWeeklyMenusTable = async (menus) => {
    await pool.query(`UPDATE weekly_menus SET menus=($1)`, [JSON.stringify(menus)])
        .catch((err) => {
            console.error;
        });
};

// fetches menus from all serveries for a given day and mealtime
const fetchMenus = async (day, mealtime) => {
    day = day.toLowerCase();
    mealtime = mealtime.toLowerCase();

    const res = await pool.query(`SELECT * FROM menus WHERE day='${day}' AND mealtime='${mealtime}'`);

    /* For example, our data will be in the form of: { 
        day: 'monday', mealtime: 'lunch', 
        north: [ { allergens: [Array], diets: [], name: 'Chicken Tagine' }, { ... }, ... ], 
        west: [ { ... }, { ... }], 
        ... 
    } */
    return res.rows[0];
};

module.exports = { updateAllMenus, updateWeeklyMenusTable, fetchMenus };

/*
** QUERIES USED TO INITIALIZE TABLES **

const createMenusQuery = `CREATE TABLE menus (
    day VARCHAR(255),
    mealtime VARCHAR(255),
    north JSONB,
    west JSONB,
    south JSONB,
    seibel JSONB,
    baker JSONB
)`;

const initializeRowsQuery = `INSERT INTO menus('day', 'mealtime') 
VALUES('monday', 'lunch'), ('monday', 'dinner'), 
('tuesday', 'lunch'), ('tuesday', 'dinner'), 
('wednesday', 'lunch'), ('wednesday', 'dinner'),
('thursday', 'lunch'), ('thursday', 'dinner'),
('friday', 'lunch'), ('friday', 'dinner'),
('saturday', 'lunch'), ('saturday', 'dinner'),
('sunday', 'lunch'), ('sunday', 'dinner');`


const createWeeklyJSONQuery = `CREATE TABLE weekly_menus (
    menu JSONB
)`;
*/ 