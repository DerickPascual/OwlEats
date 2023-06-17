const { client } = require('./twilio');

const sendText = (phoneNumber, txt) => {
    client.messages
        .create({
            body: txt,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        })
        .then((message) => console.log(message.sid));
};

module.exports = { sendText };