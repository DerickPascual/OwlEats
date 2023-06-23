const asyncHandler = require('express-async-handler');

const getUser = asyncHandler( async (req, res) => {
    const user = req.session.user;

    res.status(200).json(user);
});

const logoutUser = asyncHandler( async (req, res) => {
    req.session.destroy();

    res.status(200).json({ message: "logged out" });
});

module.exports = { getUser, logoutUser }