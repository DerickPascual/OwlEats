require('dotenv').config();
const { createTxt } = require('./textCreator');
const { fetchAllUsers } = require('../../models/users');
const { fetchMenus } = require('../../models/menus');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendText = (phone_number, txt) => {
    client.messages
        .create({
            body: txt,
            to: phone_number,
            from: process.env.TWILIO_PHONE_NUMBER
        })
        .then((message) => console.log(message.sid));
}

const sendAllTexts = (menus, users, mealtime) => {
    for (user of users) {
        const phone = user.phone_number;
        const serveries = user.serveries;
        const allergens = user.allergens;
        const diets = user.diets;

        const txt = createTxt(menus, mealtime, serveries, diets, allergens);
        sendText(phone, txt);
    }
}

module.exports = { sendAllTexts }; 