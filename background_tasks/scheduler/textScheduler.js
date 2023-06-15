const { fetchAllUsers } = require('../../models/users');
const { fetchMenus } = require('../../models/menus');
const { sendAllTexts } = require('../texts/textSender');
const { DateTime } = require('luxon');

/*
const getWeekday = () => {
    const dt = DateTime.now().setZone('America/Chicago');
    switch (dt.weekday) {
        case 1:
            return 'monday';
        case 2:
            return 'tuesday';
        case 3:
            return 'wednesday';
        case 4:
            return 'thursday';
        case 5:
            return 'friday';
        case 6:
            return 'saturday';
        case 7:
            return 'sunday';
    };
}
*/