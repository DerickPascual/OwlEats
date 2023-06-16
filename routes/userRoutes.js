const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.getUser)
    .post(usersController.createNewUser)
    .patch(usersController.updateUserSettings)
    .delete(usersController.deleteUserById);

module.exports = router;