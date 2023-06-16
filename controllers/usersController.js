const asyncHandler = require('express-async-handler');
const { insertUser, fetchUserById, fetchUserByPhone } = require('../models/users')
const { parsePhoneNumber, isValidPhoneNumber } = require('libphonenumber-js');


const createNewUser = asyncHandler(async (req, res) => {
    const { phone_number } = req.body;

    // parsedPhone will be a PhoneNumber object if valid, otherwise undefined
    let parsedPhone = parsePhoneNumber(phone_number);
    if (!parsedPhone || !isValidPhoneNumber(parsedPhone.number)) {
        const error = new Error(message='Invalid phone number');
        error.statusCode = 400;
        throw error;
    }    

    // get string representation of phone number
    parsedPhone = parsedPhone.number;
    const user = await insertUser(parsed_phone);

    res.status(201).json(user);
});