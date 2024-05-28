/*
* Helper for validation.js middleware to validate fields in POST
* and PUT requests. Validates only general information and rules specified in middleware.
*/
const Validator = require('validatorjs');

const validator = (body, rules, customMsg, callback) => {
    const validation = new Validator(body, rules, customMsg);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator
