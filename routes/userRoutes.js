const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
    .patch(usersController.updateUserSettings)
    .delete(usersController.deleteUserById);

module.exports = router;