const mongo = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongo.checkDb().db().collection('users').find();
    if (result) {
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } else {
        res.status(500).json(response.error || "An error has occurred.")
    };
};


module.exports = {
    getAll
};