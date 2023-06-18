const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verifyController');

router.route('/')
    .post(verifyController.handleVerify);

module.exports = router;