const express = require('express');
const authorController = require('../controllers/author');
const validate = require('../middleware/validation');
const router = express.Router();

router
    .get('/', authorController.getAll)
    .get('/:id', authorController.getSingle)
    .post('/', validate.validateAuthor, authorController.createAuthor)
    .put('/:id', validate.validateAuthor, authorController.updateAuthor)
    .delete('/:id', authorController.deleteAuthor)


module.exports = router;