//Imports
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongo = require('./database/db');

//Swagger Documentation Autogen
const swagger = require('swagger-autogen');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

//Authentication
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

//Auth0 config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

//Routes imports
const libraryRoute = require('./routes/library');
const userRoute = require('./routes/user');
const authorRoute = require('./routes/author');
const membershipRoute = require('./routes/memberships');

const port = process.env.PORT || 3000;
const app = express();


//Application 'logic'
app
    .use(auth(config))
    .use(bodyParser.json())
    .use('/api-docs', requiresAuth(), swaggerUI.serve, swaggerUI.setup(swaggerDoc))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/library', requiresAuth(), libraryRoute)
    //This is an added post method to the libraryRoute.
    .use('/library/checkout', requiresAuth(), libraryRoute)
    .use('/user', requiresAuth(), userRoute)
    .use('/author', requiresAuth(), authorRoute)
    .use('/membership', requiresAuth(), membershipRoute)

//Login/logout logic.
app.get('/', (req, res) => {
    //Get username of the user from Auth0, and remove the quotation marks from the json.
    //Check if the user is logged in, if the user is logged in it will grab
    //the user nickname and use the getUsername function to capitalize it.
    //otherwise, you would be logged out.
    if (req.oidc.isAuthenticated()) {
        let username = JSON.stringify(req.oidc.user.nickname).replace(/"/g, "");
        res.send(`Logged in as ${getUsername(username)}`);
    } else {
        res.send('You are logged out.')
    }
});
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});


//Database initialization / connection.
mongo.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`The server is running on ${port} port.`)
    }
});


//Function to capitalize the first letter of the username...
const getUsername = (username) => {
    return username
        .toLowerCase()
        .split(' ')
        .map(letter => letter.charAt(0).toUpperCase() + letter.slice(1))
        .join(' ');
};