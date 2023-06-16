const asyncHandler = require('express-async-handler');
const { insertUser, fetchUserById, fetchUserByPhone, updateUser, deleteUser } = require('../models/users')
const { parsePhoneNumber, isValidPhoneNumber } = require('libphonenumber-js');

// CREATE USER
const createNewUser = asyncHandler(async (req, res) => {
    const { phone_number } = req.body;

    if (!isValidPhoneNumber(phone_number)) {
        const error = new Error(message = 'Invalid phone number');
        error.statusCode = 400;
        throw error;
    }

    const duplicate = await fetchUserByPhone(phone_number);

    if (duplicate) {
        const error = new Error('Phone number already registered');
        error.statusCode = 409;
        throw error;
    }

    const user = await insertUser(phone_number);

    res.status(201).json(user);
});

// READ USER
const getUser = asyncHandler(async (req, res) => {
    const { phone_number, id } = req.body;

    if (id && parseInt(id)) {
        const user = await fetchUserById(id);
    } else if (phone_number) {
        if (!isValidPhoneNumber(phone_number)) {
            const error = new Error(message = 'Invalid phone number');
            error.statusCode = 400;
            throw error;
        }

        const user = await fetchUserByPhone(phone_number);
    } else {
        const error = new Error('Invalid phone number or id');
        error.statusCode = 400;
        throw error;
    }

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(user);
});

//UPDATE USER
const updateUserSettings = asyncHandler(async (req, res) => {
    const { id, phone_number, serveries, allergens, diets } = req.body;

    if (!id || !parseInt(id) || !phone_number || !isValidPhoneNumber(phone_number) || !Array.isArray(serveries) || !Array.isArray(allergens) || !Array.isArray(diets)) {
        const error = new Error('All inputs are required');
        error.statusCode = 400;
        throw error;
    }

    const user = await updateUser(id, phone_number, serveries, allergens, diets);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(user);
});

// delete USER
const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id || !parseInt(id)) {
        const error = new Error('Invalid id');
        error.statusCode = 400;
        throw error;
    }

    const user = await deleteUser(id);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    res.status(204);
});

module.exports = { createNewUser, getUser, updateUserSettings, deleteUserById }

