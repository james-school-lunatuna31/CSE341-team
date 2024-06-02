const express = require('express');
const membershipController = require('../controllers/memberships');
const validate = require('../middleware/validation');
const router = express.Router();

router
    .get('/', membershipController.getAll)
    .get('/:id', membershipController.getSingle)
    .post('/', validate.validateMem, membershipController.createMembership)
    .put('/:id', validate.validateMem, membershipController.updateMembership)
    .delete('/:id', membershipController.deleteMembership)

    module.exports = router;