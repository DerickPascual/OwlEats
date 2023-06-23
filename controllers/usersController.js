const asyncHandler = require('express-async-handler');
const { fetchUserById, fetchUserByPhone, updateUser, deleteUser } = require('../models/users')
const { isValidPhoneNumber } = require('libphonenumber-js');

//UPDATE USER
const updateUserSettings = asyncHandler(async (req, res) => {
    const { serveries, allergens, diets } = req.body;

    if (!Array.isArray(serveries) || !Array.isArray(allergens) || !Array.isArray(diets)) {
        const error = new Error('All inputs are required');
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

    const user = req.session.user;
    const id = user.id;
    const phoneNumber = user.phoneNumber;

    const updatedUser =  await updateUser(id, phoneNumber, serveries, allergens, diets);

    if (!updatedUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    req.session.user = updatedUser;

    res.status(200).json(updatedUser);
});

// delete USER
const deleteUserById = asyncHandler(async (req, res) => {
    const id = req.session.user.id;

    const user = await deleteUser(id);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    req.session.destroy();

    res.status(200).json( { message: "User deleted", user: user });
});

module.exports = { updateUserSettings, deleteUserById };

