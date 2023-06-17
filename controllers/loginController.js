const asyncHandler = require('express-async-handler');
const { fetchUserByPhone } = require('../models/users');
const { isValidPhoneNumber } = require('libphonenumber-js');

const handleLogin = asyncHandler(async (req, res) => {
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

    const user = await fetchUserByPhone(phoneNumber);

    if (!user) {
        const error = new Error('Phone number not registered');
        error.statusCode = 404;
        throw error;
    }

    req.session.user = user;

    res.status(200).json(user);
});

module.exports = { handleLogin };