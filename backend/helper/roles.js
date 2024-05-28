const auth = require('express-openid-connect');
const dotenv = require('dotenv');


/*
* Gets the user's role from the request open-id and user_metadata token built into Auth0,
* then returns as usable data. The userRole is stored as its ID, not title.
*/
const getRole = (req) => {
    let userRole = req.oidc.user.user_metadata.role;
    return userRole;
};


module.exports = {
    getRole
};