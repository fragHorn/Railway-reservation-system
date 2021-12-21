const db = require('../database/db');

module.exports = class Train{
    static findTrain(trainId){
        return db.execute(
            `SELECT * FROM trains
             WHERE
             trains.train_no = ${trainId};`
        );
    }
};