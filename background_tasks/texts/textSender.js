const { createTxt } = require('./textCreator');
const { sendText } = require('../../twilio/messenger');

// Sends texts to all users given menus, users, and mealtime.
const sendAllTexts = (menus, users, mealtime) => {
    for (user of users) {
        const phone = user.phoneNumber;
        const serveries = user.serveries;
        const allergens = user.allergens;
        const diets = user.diets;

        const txt = createTxt(menus, mealtime, serveries, diets, allergens);

        if (txt.length >= 1600) {
            let firstTextEndingServeryIndx = Math.ceil(serveries.length / 2);

            let txt1 = createTxt(menus, mealtime, serveries.slice(0, firstTextEndingServeryIndx), diets, allergens);
            let txt2 = createTxt(menus, mealtime, serveries.slice(firstTextEndingServeryIndx, serveries.length), diets, allergens);
            

            if (txt1.length >= 1600) {
                const initialFirstTextEndingServeryIndx = firstTextEndingServeryIndx;
                firstTextEndingServeryIndx = Math.ceil(firstTextEndingServeryIndx / 2);

                txt1 = createTxt(menus, mealtime, serveries.slice(0, firstTextEndingServeryIndx), diets, allergens);
                txt2 = createTxt(menus, mealtime, serveries.slice(firstTextEndingServeryIndx, initialFirstTextEndingServeryIndx), diets, allergens);
                const txt3 = createTxt(menus, mealtime, serveries.slice(initialFirstTextEndingServeryIndx, serveries.length), diets, allergens);
                
                console.log(`SENDING TEXT1 to ${phone}`);
                sendText(phone, txt1);
                console.log(`SENDING TEXT2 to ${phone}`);
                sendText(phone, txt2);
                console.log(`SENDING TEXT3 TO ${phone}`);
                sendText(phone, txt3);

            } else {
                console.log(`SENDING TEXT1 TO ${phone}`);
                console.log(`SENDING TEXT2 TO ${phone}`);

                sendText(phone, txt1);
                sendText(phone, txt2);
            }

        } else {
            console.log(`SENDING TEXT TO ${phone}`);
            sendText(phone, txt);
        }
    }
}

module.exports = { sendAllTexts }; 