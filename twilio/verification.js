const { client } = require('./twilio');

const sendVerificationText = (phoneNumber) => {
    client.verify.v2.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' })
        .then(verification => console.log(verification.status));
};

module.exports = { sendVerificationText }; 

