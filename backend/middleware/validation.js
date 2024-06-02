const validate = require('../helper/validator');
//The import was the problem.
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
    let test = console.log(req.body, "hi");
    let isbnCheck = isbnValidator(req.body.isbn);
    console.log(isbnCheck);
    console.log(test)
    if (isbnCheck) {
        validate(req.body, validRules, {}, (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: "Validation Failed",
                    data: err
                });
            } {
                next();
            }
        })
    } else {
        res.status(413).send({
            success: false,
            message: "ISBN Validation failed"
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
                data: err
            });
        } else {
            next();
        }
    });
};


const validateAuthor = (req, res, next) => {
    const validRules = {
        firstName: "required|string",
        lastName: "required|string",
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
        };
    });
};


const validateMem = (req, res, next) => {
    const validRules = {
        firstName: "required|string",
        lastName: "required|string",
        userId: "required|string",
        membershipType: "required|string",
        memberSince: "required|string"
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
        };
    });
};


module.exports = {
    validateBook,
    validateUser,
    validateAuthor,
    validateMem
};