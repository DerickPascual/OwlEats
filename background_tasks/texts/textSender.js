const { createTxt } = require('./textCreator');
const { sendText } = require('../../twilio/messenger');

const sendAllTexts = (menus, users, mealtime) => {
    for (user of users) {
        const phone = user.phoneNumber;
        const serveries = user.serveries;
        const allergens = user.allergens;
        const diets = user.diets;

        const txt = createTxt(menus, mealtime, serveries, diets, allergens);
        sendText(phone, txt);
    }
}

module.exports = { sendAllTexts }; 