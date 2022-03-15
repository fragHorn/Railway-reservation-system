const mongoDB = require('mongodb');
const { MongoClient } = mongoDB;
require('dotenv').config();

let _db;

const mongoConnect = callback => {
    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(client => {
        // console.log(client);
        _db = client.db();
        console.log('Connected!!');
        callback();
    })
    .catch((error) => {
        // const error = new Error('Database connection failed!!');
        console.log(error);
    });
}

const getDB = () => {
    if(_db)
        return _db;
    throw new Error('Database connection failed!!!');
}

module.exports = {
    mongoConnect: mongoConnect,
    getDB: getDB
};