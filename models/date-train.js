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
                return db.execute(
                    `SELECT * FROM trains
                     WHERE
                     trains.train_no = ${trainId};`
                )
                .then(([train]) => {
                    const seats = train[0].no_of_seats - noOfPassengers;
                    return db.execute(
                        `INSERT INTO dateTrain
                         (trainDate, train_id, no_of_seats)
                         VALUES
                         ("${date}", ${trainId}, ${seats});`
                    );
                })
                .catch(err => {
                    return Promise.reject('Something went wrong...!!')
                });
            }
        })
        .catch(err => {
            console.log(err);
            return Promise.reject('Something bad happened...!!!');
        });
    }

    static checkTrainAvailability(trainId, date){
        return db.execute(
            `SELECT * FROM
             dateTrain
             WHERE 
             dateTrain.train_id = ${trainId} 
             AND dateTrain.trainDate = "${date}";`
        );
    }
};