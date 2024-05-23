const mongo = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');

let errorMsg = 'An error occurred, please try again!'

//TODO - Work on getting role
//We can get the role from the request info that is
//transmitted through Auth0. Unable to run the backend
//in the cloud, so will continue this tomorrow.
const getRole = async (req, res) => {
    let userRole = req.oidc.user.nick;
}


const getList = async (req, res) => {
    const result = await mongo.checkDb().db().collection('library').find();
    if (result) {
        result.toArray().then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const getSingleId = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID to search for a book.')
    }
    const bookId = ObjectId.createFromHexString(req.params.id);
    mongo.checkDb().db().collection('library').find({ _id: bookId }).toArray((err, result) => {
        if (error) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};



//TODO - Add roles and roleid to env to use in place of permission check
const addBook = async (req, res, permissions) => {
    const book = {
        title: req.body.title
    };
    if (permissions == process.env.PUBLISHER) {
        const response = await mongo.checkDb().db().collection('library').insertOne(book);
        if (response) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        }
    } else {
        res.status(350).json('You do not possess the required permissions..');
    }
}