const Station = require('../models/station');
const db = require('./db');

exports.enterDataInStation = () => {
    return db.execute(
            `SELECT * FROM Station`
    )
    .then( ([output]) => {
        if(output.length === 0){
            return db.execute(
                `INSERT INTO station
                 VALUES 
                 ('dlh', 'Delhi'),
                 ('lko', 'lucknow');`
            );
        }
        return Promise.resolve('Success');
    })
    .catch(err => {
        return Promise.resolve('Success');
    });
};

exports.enterDataInTrain = () => {
    return db.execute(
        `SELECT * FROM trains`
    )
    .then( ([output]) => {
         if(output.length === 0){
            return db.execute(
                `INSERT INTO trains
                 VALUES
                 (23245, 'Shatabdi-express', 100),
                 (10231, 'Tejas Express', 200);`
            );
         }
         return Promise.resolve('Success');
    })
    .catch(err => {
        return Promise.resolve('Success');
    });
};