const express = require('express');
const userController = require('../controllers/user');
const validate = require('../middleware/validation');
const router = express.Router();

router
    .get('/', userController.getAll)

    module.exports = router;