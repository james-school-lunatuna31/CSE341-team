const mongo = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
const auth = require('express-openid-connect');
const role = require('../helper/roles');

const errorMsg = 'An error occurred, please try again!'


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


const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID to search for a book.')
    }
    const bookId = ObjectId.createFromHexString(req.params.id);
    const result = await mongo.checkDb().db().collection('library').find({ _id: bookId });
    if (result) {
        result.toArray().then((book) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(book[0]);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


//TODO - Look into placing checkout book into users? Users may be deprecated anyway and is just for show for assignment.
const checkoutBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID to check out a book.');
    }
    const bookId = ObjectId.createFromHexString(req.params.id);
    let permissions = role.getRole(req);
    if (permissions === process.env.USER) {
        const result = await mongo.checkDb().db().collection('library').find({ _id: bookId });
        if (result) {
            result.toArray().then((book) => {
                let currentBook = book[0];
                let currentStock = currentBook.stock;
                //Check if the book is currently available.
                if (currentStock == 0) {
                    res.status(351).json('The book is out of stock already!')
                } else {
                    let newStock = currentStock -= 1;
                    res.status(349).json(currentBook);
                    const updateQuantity = {
                        $set: {
                            stock: newStock
                        },
                    };
                    updateBookQuantity(bookId, updateQuantity);
                }
            });
        };
    } else {
        res.status(350).json('You do not possess the required permissions to check out a book.');
    };
};


/*
* Function to update the stock of a book in the library.
*/
async function updateBookQuantity(bookId, updateDoc) {
    await mongo.checkDb().db().collection('library').updateOne({ _id: bookId}, updateDoc, false);
};



const addBook = async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        published: req.body.published,
        isbn: req.body.isbn,
        stock: req.body.stock
    };
    //Experimental
    let permissions = role.getRole(req);
    //                       CHANGE TO .PUBLISHER
    if (permissions === process.env.ADMIN) {
        const response = await mongo.checkDb().db().collection('library').insertOne(book);
        if (response) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || errorMsg);
        }
    } else {
        res.status(350).json('You do not possess the required permissions..');
    };
};


const updateBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID to search for a book.');
    }
    const bookId = ObjectId.createFromHexString(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        published: req.body.published,
        isbn: req.body.isbn,
        stock: req.body.stock
    };
    const response = await mongo.checkDb().db().collection('library').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const deleteBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID to search for a book.');
    }
    const bookId = ObjectId.createFromHexString(req.params.id);
    const response = await mongo.checkDb().db().collection('library').deleteOne({ _id: bookId });
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


module.exports = {
    getList,
    getSingle,
    checkoutBook,
    addBook,
    updateBook,
    deleteBook
};