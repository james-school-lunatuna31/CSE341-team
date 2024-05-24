const express = require('express');
const userController = require('../controllers/user');
const validate = require('../middleware/validation');
const router = express.Router();

router
    .get('/', userController.getAll)
    .get('/:id', userController.getSingle)
    .post('/', validate.validateUser, userController.createUser)
    .put('/:id', validate.validateUser, userController.updateUser)
    .delete('/:id', userController.deleteUser)

    module.exports = router;