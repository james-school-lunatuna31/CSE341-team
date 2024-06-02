const route = require('express').Router();
const userRoute = require('./user');
const authorRoute = require('./author');
const membershipRoute = require('./memberships');
const libraryRoute = require('./library');

route
    .use('/', require('./swaggergen'))
    .use('/user', userRoute)
    .use('/library', libraryRoute)
    .use('/author', authorRoute)
    .use('/membership', membershipRoute)
    .use('/library/checkout', libraryRoute)


module.exports = route;