const route = require('express').Router();
const userRoute = require('./user');
const adminRoute = require('./admin');
const publisherRoute = require('./publisher');
const libraryRoute = require('./library');

route
    .use('/', require('./swaggergen'))
    .use('/users', userRoute)
    .use('/library', libraryRoute)
    .use('/library/checkout', libraryRoute)


module.exports = route;