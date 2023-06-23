const { client, serviceSid } = require('./twilio');

const sendVerificationText = (phoneNumber) => {
    client.verify.v2.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' });
};

const checkVerificationText = (phoneNumber, code) => {
    return client.verify.v2.services(serviceSid)
        .verificationChecks
        .create({to: phoneNumber, code: code })
        .then(verification_check => {
            return verification_check.status;
        });
};

module.exports = { sendVerificationText, checkVerificationText }; 

