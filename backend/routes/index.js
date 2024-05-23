const route = require('express').Router();
const userRoute = require('./user');
const adminRoute = require('./admin');
const publisherRoute = require('./publisher');
const libraryRoute = require('./library');

route
    .use('/', require('./swaggergen'));


module.exports = route;