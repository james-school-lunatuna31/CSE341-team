const validate = require('../helper/validator');



const validateBook = (req, res, next) => {
    const validRules = {
        title: "required|string",
        author: "required|string",
        genre: "required|string",
        published: "required|integer",
        isbn: "required|string",
        stock: "required|integer"
    };
    let checkIsbn = validate.isbnValidator(validRules.isbn)
    if (checkIsbn) {
        validate(req.body, validRules, {}, (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: "Validation failed.",
                    data: error
                });
            } else {
                next();
            }
        });
    };
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
                data: error
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