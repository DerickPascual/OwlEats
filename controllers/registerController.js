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
    req.session.phoneNumber = phoneNumber;

    res.status(200).json({ message: 'Success' });
});

const getRegisterInfo = asyncHandler(async (req, res) => {
    const responseObject = { 
        inVerification: req.session.inVerification,
        phoneNumber: req.session.phoneNumber,
    }

    res.status(200).json(responseObject);
})

module.exports = { getRegisterInfo, handleRegister }