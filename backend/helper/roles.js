const auth = require('express-openid-connect');
const dotenv = require('dotenv');

const getRole = (req) => {
    let userRole = req.oidc.user.user_metadata.role;
    // console.log(userRole); //debug
    return userRole;
};


module.exports = {
    getRole
};