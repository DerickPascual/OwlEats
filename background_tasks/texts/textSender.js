const { createTxt } = require('./textCreator');
const { sendText } = require('../../twilio/messenger');
const { ConversationListInstance } = require('twilio/lib/rest/conversations/v1/conversation');

const sendAllTexts = (menus, users, mealtime) => {
    for (user of users) {
        const phone = user.phoneNumber;
        const serveries = user.serveries;
        const allergens = user.allergens;
        const diets = user.diets;

        const txt = createTxt(menus, mealtime, serveries, diets, allergens);

        if (txt.length >= 1600) {
            firstTextEndingServeryIndx = Math.ceil(serveries.length / 2);

            const txt1 = createTxt(menus, mealtime, serveries.slice(0, firstTextEndingServeryIndx), diets, allergens);
            const txt2 = createTxt(menus, mealtime, serveries.slice(firstTextEndingServeryIndx, serveries.length), diets, allergens);

            console.log(`SENDING TEXT1 TO ${phone}`);
            console.log(`SENDING TEXT2 TO ${phone}`);

            sendText(phone, txt1);
            sendText(phone, txt2);

        } else {
            console.log(`SENDING TEXT TO ${phone}`);
            sendText(phone, txt);
        }
    }
}

module.exports = { sendAllTexts }; 