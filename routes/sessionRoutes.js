const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.route('/')
    .get(sessionController.getUser)
    .post(sessionController.logoutUser);

module.exports = router;