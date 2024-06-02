const { response } = require('express');
const mongo = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const role = require('../helper/roles');
const errorMsg = 'An error occurred, please try again!';

const getAll = async (req, res) => {
    /*
    #swagger.tag=["Authors"]
    #swagger.description="Retrieves all authors stored in the database, includes the books they have in the library."
    */
    
    const result = await mongo.checkDb().db().collection('authors').find();
    if (result) {
        result.toArray().then((author) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(author);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const getSingle = async (req, res) => {
    /*
    #swagger.tags=["Authors"]
    #swagger.description="Retrieves a single author by their ID."
    */
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID.');
    }
    const authorId = ObjectId.createFromHexString(req.params.id);
    const result = await mongo.checkDb().db().collection('authors').find({ _id: authorId });
    if (result) {
        result.toArray().then((author) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(author[0]);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const createAuthor = async (req, res) => {
    /*
    #swagger.tags=["Authors"]
    #swagger.description="Creates a new author, only useable by a admin after validation."
    */
    let permissions = role.getRole(req);
    if (permissions === process.env.ADMIN) {
        const author = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            books: {
                id: req.body.id
            }
        };
        const response = await mongo.checkDb().db().collection('authors').insertOne(author);
        if (response) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        }
    } else {
        res.status(350).json(role.permMsg);
    };
};


const updateAuthor = async (req, res) => {
    /*
    #swagger.tags=["Authors"]
    #swagger.description="Updates an existing author, only useable by a admin after validation."
    */
    
    //Check if user has permission to modify file.
    let permissions = role.getRole(req);
    if (permissions === process.env.ADMIN) {
        //Check if ID Exists before doing anything else.
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID.');
        }
        const authorId = ObjectId.createFromHexString(req.params.id);
        const author = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            books: {
                id: req.body.id
            }
        };
        const response = await mongo.checkDb().db().collection('authors').replaceOne({ _id: authorId }, author);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        }
    //If the user does not have the permissions.
    } else {
        res.status(350).json(role.permMsg);
    };
};


const deleteAuthor = async (req, res) => {
    /*
    #swagger.tags=["Authors"]
    #swagger.description="Deletes an existing author, only useable by a admin after validation. Does not affect books."
    */

    let permissions = role.getRole(req);
    if (permissions === process.env.ADMIN) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid ID');
        }
        const authorId = ObjectId.createFromHexString(req.params.id);
        const response = await mongo.checkDb().db().collection('authors').deleteOne({ _id: authorId });
        if (response) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        };
        //Does not have permission
    } else {
        res.status(350).json(role.permMsg);
    };
};


module.exports = {
    getAll,
    getSingle,
    createAuthor,
    updateAuthor,
    deleteAuthor
};