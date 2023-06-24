const asyncHandler = require('express-async-handler');
const { fetchUserById } = require('../models/users');

const getUser = asyncHandler( async (req, res) => {
    const sessionUser = req.session.user;
    
    if (!sessionUser) {
        res.status(200).json(sessionUser);
        return;
    }

    // syncing session with DB
    const DBuser = await fetchUserById(sessionUser.id);
    req.session.user = DBuser;

    res.status(200).json(DBuser);
});

const logoutUser = asyncHandler( async (req, res) => {
    req.session.destroy();

    res.status(200).json({ message: "logged out" });
});

module.exports = { getUser, logoutUser }