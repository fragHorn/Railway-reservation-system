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
                 (23245, 'Shatabdi-express', 200),
                 (10231, 'Tejas Express', 100);`
            );
         }
         return Promise.resolve('Success');
    })
    .catch(err => {
        return Promise.resolve('Success');
    });
};

exports.enterTrainStationData = () => {
    return db.execute(
        `SELECT * FROM trainStation`
    )
    .then( ([output]) => {
       if(output.length === 0){
           return db.execute(
            `INSERT INTO trainStation 
             (arrival_time, departure_time, train_id, fromStation_id, toStation_id, train_fare)
             VALUES
             ("18:00:00", "18:05:00", 10231, "dlh", "lko", 500),
             ("06:00:00", "06:10:00", 10231, "lko", "dlh", 480),
             ("07:00:00", "07:45:00", 23245, "dlh", "lko", 480);`
           );
       } 
       return Promise.resolve('Success');
    })
    .catch(err => {
        return Promise.resolve('Success');
    });
};
