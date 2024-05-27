/*
* Helper for validation.js middleware to validate fields in POST
* and PUT requests.
*/
const Validator = require('validatorjs');

const validator = (body, rules, customMsg, callback) => {
    const validation = new Validator(body, rules, customMsg);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};


/*
* Validates an ISBN number, requires an isbn as a parameter.
*/
const isbnValidator = (isbn, callback) => {
    const validation = new Validator(isbn);
    let variable = null;

    isbn = isbn.replace(/-/g, '');

    //Checks if the length of the ISBN is not 10 or 13, returns false if so.
    if (isbn.length !== 10 && isbn.length !== 13) {
        variable = false;
    }

    //10 Digit ISBN checker.
    if (isbn.length === 10) {
        if (!/^\d{9}(\d|X)$/.test(isbn)) {
            variable = false;
        }

        let checkSum = 0;
        for (let i = 0; i < 9; i++) {
            checkSum += (i + 1) * parseInt(isbn[i]);
        }
        checkSum = checkSum % 11;
        if (isbn[9] === 'X') {
            variable = checkSum === 10, variable = true;
        } else {
            variable = checkSum === parseInt(isbn[9]);
        }
    }

    if (isbn.length === 13) {
        if (!/^\d{13}$/.test(isbn)) {
            variable = false;
        }

        let checkSum = 0;
        for (let i = 0; i < 12; i++) {
            checkSum += (i % 2 === 0 ? 1 : 3) * parseInt(isbn[i]);
        }
        checkSum = (10 - (checkSum % 10)) % 10;
        variable = checkSum === parseInt(isbn[12]);
    }

    if (variable == true) {
        validation.passes(); // => callback(null, true) was in here, not working?
        console.log("testing here in conditional.");
    } else if (variable == false) {
        validation.fails(() => callback(validation.errors, false));
        console.log("Validation failed");
    }
};

module.exports = {
    validator, 
    isbnValidator
};
