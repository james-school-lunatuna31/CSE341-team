const environment = require('dotenv');
environment.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log("DB has already been initialized");
        return callback(null, _db);
    }
    MongoClient.connect(process.env.DB_CONN)
    .then((client) => {
        _db = client;
        callback(null, db);
    })
    .catch((err) => {
        callback(err);
    });
};


const checkDb = () => {
    if (!_db) {
        throw Error("DB is not initialized or had an error");
    }
    return _db;
};

module.exports = { initDb, checkDb }