const asyncHandler = require('express-async-handler');
const { fetchUserByPhone } = require('../models/users');
const { isValidPhoneNumber } = require('libphonenumber-js');
const { sendVerificationText } = require('../twilio/verification');

const handleRegister = asyncHandler(async (req, res) => {
    if (!req.body) {
        const error = new Error('Request body not found');
        error.statusCode = 400;
        throw error;
    }

    const { phoneNumber } = req.body;

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
        const error = new Error('Invalid phone number');
        error.statusCode = 400;
        throw error;
    }

    const duplicate = await fetchUserByPhone(phoneNumber);
    if (duplicate) {
        const error = new Error('Phone number already registered')
        error.statusCode = 409;
        throw error;
    }

    sendVerificationText(phoneNumber);
    req.session.inVerification = true;

    res.status(302).redirect('/verify');
});

if (process.env.NODE_ENV === 'test') {
    module.exports = { sendTwilioVerificationText: sendVerificationText, handleRegister };
} else {
    module.exports = { handleRegister };
}