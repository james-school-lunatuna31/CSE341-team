const validate = require('../helper/validator');

let fakeIsbn = "39124123123";
let real13Isbn = "978-3-16-148410-0";
let real10Isbn = "978-1-59-8870923";

console.log(validate.isbnValidator(real13Isbn));