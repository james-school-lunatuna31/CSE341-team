const mongo = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const errorMsg = 'An error occurred, please try again!';


const getAll = async (req, res) => {
    /*
    #swagger.tag=["Memberships"]
    #swagger.description="Retrieves all memberships actively stored in the database, includes the userId they are."
    */
    const result = await mongo.checkDb().db().collection('memberships').find();
    if (result) {
        result.toArray().then((memberships) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(memberships);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const getSingle = async (req, res) => {
    /*
    #swagger.tag=["Memberships"]
    #swagger.description="Retrieves a single membership by the membership ID or the userId."
    */
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID.');
    }
    const memId = ObjectId.createFromHexString(req.params.id);
    const result = await mongo.checkDb().db().collection('memberships').find({ _id: memId });
    if (result) {
        result.toArray().then((membership) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(membership[0]);
        });
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const createMembership = async (req, res) => {
    /*
    #swagger.tag=["Memberships"]
    #swagger.description="Creates a new membership for a user using the required fields."
    */
    
    const memFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.userId,
        membershipType: req.body.membershipType,
        memberSince: req.body.memberSince
    };

    const response = await mongo.checkDb().db().collection('memberships').insertOne(memFields);
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const updateMembership = async (req, res) => {
    /*
    #swagger.tag=["Memberships"]
    #swagger.description="Updates the fields of a membership in the database."
    */
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ID to search for a book');
    }
    const memId = ObjectId.createFromHexString(req.params.id);
    const memFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.userId,
        membershipType: req.body.membershipType,
        memberSince: req.body.memberSince
    };
    const response = await mongo.checkDb().db().collection('memberships').updateOne({ _id: memId }, memFields);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


const deleteMembership = async (req, res) => {
    /*
    #swagger.tag=["Memberships"]
    #swagger.description="Deletes a membership from the database"
    */
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid ID to search for a book.');
    }
    const memId = ObjectId.createFromHexString(req.params.id);
    const response = await mongo.checkDb().db().collection('memberships').deleteOne({ _id: memId });
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || errorMsg);
    };
};


module.exports = {
    getAll,
    getSingle,
    createMembership,
    updateMembership,
    deleteMembership
};