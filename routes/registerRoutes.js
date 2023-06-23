const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.route('/')
    .get(registerController.getRegisterInfo)
    .post(registerController.handleRegister);

module.exports = router;