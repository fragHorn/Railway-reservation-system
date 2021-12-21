const db = require('../database/db');

module.exports = class DateTrain{
    static updateSeats(date, noOfPassengers, trainId){
        return db.execute(
            `SELECT * FROM dateTrain
             WHERE 
             dateTrain.trainDate = "${date}" 
             AND dateTrain.train_id = ${trainId};`
        )
        .then( ([output]) => {
            if(output.length > 0){
                return db.execute(
                    `UPDATE dateTrain
                     SET
                     no_of_seats = no_of_seats - ${noOfPassengers}
                     WHERE dateTrain.trainDate = "${date}" 
                     AND dateTrain.train_id = ${trainId};`
                );
            }
            else{
                return Promise.reject('No such train found!!!');
            }
        })
        .catch(err => {
            console.log(err);
            return Promise.reject('Either the date format or the train_id is wrong!!!');
        });
    }

    static checkForSeats(trainId, noOfPassengers, date){
        return db.execute(
            `SELECT * FROM dateTrain
             WHERE 
             dateTrain.trainDate = "${date}" 
             AND dateTrain.train_id = ${trainId};`
        )
        .then(([output]) => {
            if(output.length === 0){
                return db.execute(
                    `SELECT * FROM trains
                     WHERE
                     trains.train_no = ${trainId};`
                )
                .then(([train]) => {
                    if(train.length > 0){
                        const seats = train[0].no_of_seats;
                        return db.execute(
                            `INSERT INTO dateTrain
                             (trainDate, train_id, no_of_seats)
                             VALUES
                             ("${date}", ${trainId}, ${seats});`
                        );   
                    }
                    else{
                        return Promise.reject('Sorry, the train was not found!!!');
                    }
                })
                .catch(err => Promise.reject('Sorry, the train was not found!!!'));
            }
            else{
                if(output[0].no_of_seats >= noOfPassengers){
                    return Promise.resolve('Ok');
                }
                else{
                    return Promise.reject('No more seats available!!!');
                }
            }
        })
        .catch(err => {
            return Promise.reject('Sorry the given train was not found!!!');
        })
    }
};