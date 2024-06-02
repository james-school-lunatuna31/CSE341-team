const mongo = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const role = require('../helper/roles');

const errorMsg = 'An error occurred, please try again!'

const getAll = async (req, res) => {
    const result = await mongo.checkDb().db().collection('users').find();
    if (result) {
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    }
};


const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID.')
    }
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongo.checkDb().db().collection('users').find({ _id: userId });
    if (result) {
        result.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user[0]);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const createUser = async (req, res) => {
    // var permissions = role.getRole(req);
    // if (permissions === process.env.ADMIN) {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            role: req.body.role
        };
        const response = await mongo.checkDb().db().collection('users').insertOne(user);
        if (response) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        }
    // } else {
    //     res.status(350).json('You do not possess the required permissions to do this.');
    // }
};


const updateUser = async (req, res) => {
    // let permissions = role.getRole(req);
    // if (permissions === process.env.ADMIN) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID.');
        }
        const userId = ObjectId.createFromHexString(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            role: req.body.role
        };
        const response = await mongo.lassoDb().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        }
    // } else {
    //     res.status(350).json('You do not possess the required permissions to do this.')
    // }
};


const deleteUser = async (req, res) => {
    // let permissions = role.getRole(req);
    // if (permissions === process.env.ADMIN) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID');
        }
        const userId = ObjectId.createFromHexString(req.params.id);
        const response = await mongo.checkDb().db().collection('users').deleteOne({ _id: userId });
        if (response) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        }
    // }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};