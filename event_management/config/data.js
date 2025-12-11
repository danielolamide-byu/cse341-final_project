// const { mongo } = require('mongoose');


const dotenv = require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initdb = (callback) => {
    if (database) {
        console.log("DB initialized");
        return callback(null, database);
    }
    const connect = process.env.MONGO_URL
    MongoClient.connect(connect)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err)
        });
        // console.log("DB Connection String Used:", connect)
    
};

const getDatabase = () => {
    if (!database) {
        throw Error("Database not Initialized");
    }
    return database;
};



module.exports = {
    initdb,
    getDatabase
};