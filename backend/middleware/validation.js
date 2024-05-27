const validate = require('../helper/validator');
const val = require('../helper/isbnvalidator');
const isbnValidator = require('../helper/isbnvalidator');



const validateBook = (req, res, next) => {
    const validRules = {
        title: "required|string",
        author: "required|string",
        genre: "required|string",
        published: "required|integer",
        isbn: "required|string",
        stock: "required|integer"
    };
    validate(req.body, validRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation Failed",
                data: err
            });
        } else {
            let isbn = val.isbnValidator(req.body.isbn, (err))
            if (!isbn) {
                res.status(412).send({
                    success: false,
                    message: "ISBN Validation failed",
                    data: err
                });
            } else {
                next();
            }
        }
    })
};


const validateUser = (req, res, next) => {
    const validRules = {
        firstName: "required|string",
        lastName: "required|string",
        userName: "required|string",
        role: "required|string"
    };
    validate(req.body, validRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation Failed",
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    validateBook,
    validateUser
};