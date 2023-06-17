const asyncHandler = require('express-async-handler');
const { insertUser, fetchUserById, fetchUserByPhone, updateUser, deleteUser } = require('../models/users')
const { isValidPhoneNumber, PhoneNumber } = require('libphonenumber-js');

// CREATE USER
const createNewUser = asyncHandler(async (req, res) => {
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
        const error = new Error('Phone number already registered');
        error.statusCode = 409;
        throw error;
    }

    const user = await insertUser(phoneNumber);

    res.status(201).json(user);
});

// READ USER
const getUser = asyncHandler(async (req, res) => {
    if (!req.body) {
        const error = new Error('Request body not found');
        error.statusCode = 400;
        throw error;
    }

    const { phoneNumber, id } = req.body;

    let user;
    if (id && parseInt(id)) {
        user = await fetchUserById(id);
    } else if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
        user = await fetchUserByPhone(phoneNumber);
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
    if (!req.body) {
        const error = new Error('Request body not found');
        error.statusCode = 400;
        throw error;
    }

    const { id, phoneNumber, serveries, allergens, diets } = req.body;

    if (!id || !phoneNumber || !Array.isArray(serveries) || !Array.isArray(allergens) || !Array.isArray(diets)) {
        const error = new Error('All inputs are required');
        error.statusCode = 400;
        throw error;
    }

    if (!parseInt(id)) {
        const error = new Error('Invalid id');
        error.statusCode = 400;
        throw error;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
        const error = new Error('Invalid phone number');
        error.statusCode = 400;
        throw error;
    }

    if (!serveries.every(servery => (servery === 'north' || servery === 'south' || servery === 'west' || servery === 'seibel' || servery === 'baker'))) {
        const error = new Error('Invalid value in serveries array');
        error.statusCode = 400;
        throw error;
    }

    const possibleAllergens = ['gluten', 'soy', 'dairy', 'eggs', 'fish', 'shellfish', 'peanuts', 'treenuts', 'sesame'];
    if (!allergens.every(allergen => possibleAllergens.includes(allergen))) {
        const error = new Error('Invalid value in allergens array');
        error.statusCode = 400;
        throw error;
    }

    if (!diets.every(diet => (diet === 'vegetarian' || diet === 'vegan' || diet === 'halal'))) {
        const error = new Error('Invalid value in diets array');
        error.statusCode = 400;
        throw error;
    }

    const user = await updateUser(id, phoneNumber, serveries, allergens, diets);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(user);
});

// delete USER
const deleteUserById = asyncHandler(async (req, res) => {
    if (!req.body) {
        const error = new Error('Request body not found');
        error.statusCode = 400;
        throw error;
    }

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

    res.status(200).json( { message: "User deleted", user: user });
});

module.exports = { createNewUser, getUser, updateUserSettings, deleteUserById };

