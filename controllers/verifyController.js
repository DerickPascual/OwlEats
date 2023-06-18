const asyncHandler = require('express-async-handler');
const { isValidPhoneNumber } = require('libphonenumber-js');
const { checkVerificationText } = require('../twilio/verification');
const { insertUser, fetchUserByPhone } = require('../models/users');

const handleVerify = asyncHandler(async (req, res) => {
    if (!req.body) {
        const error = new Error('Request body not found');
        error.statusCode = 400;
        throw error;
    }

    const { phoneNumber, verificationCode } = req.body

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
        const error = new Error('Invalid phone number');
        error.statusCode = 400;
        throw error;
    }

    if (!verificationCode || !parseInt(verificationCode)) {
        const error = new Error('Invalid verification code');
        error.statusCode = 400;
        throw error;
    }

    const result = await checkVerificationText(phoneNumber, verificationCode);

    if (result !== 'approved') {
        const error = new Error('Invalid verification code');
        error.statusCode = 400;
        throw error;
    }

    const duplicate = await fetchUserByPhone(phoneNumber);
    if (duplicate) {
        const error = new Error('Phone number already registered');
        error.statusCode = 409;
        throw error;
    }

    const user = await insertUser(phoneNumber);
    req.session.user = user;

    req.session.inVerification = false;
    res.status(302).redirect('/settings');
});

module.exports = { handleVerify };