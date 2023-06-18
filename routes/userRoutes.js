const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.getUser)
    .patch(usersController.updateUserSettings)
    .delete(usersController.deleteUserById);

module.exports = router;