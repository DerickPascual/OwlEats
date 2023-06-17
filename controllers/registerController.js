const asyncHandler = require('express-async-handler');
const { fetchUserByPhone } = require('../models/users');
const { isValidPhoneNumber } = require('libphonenumber-js');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

const sendTwilioVerificationText = (phoneNumber) => {
    client.verify.v2.services(serviceSid)
        .verifications
}

const handleInitialRegistration = asyncHandler(async (req, res) => {
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
})