const db = require('../database/db');

module.exports = class Train{
    static updateSeats(noOfPassengers, train_id){
        return db.execute(
            `UPDATE trains
             SET
             no_of_seats = no_of_seats - ${noOfPassengers}
             WHERE trains.train_no = ${train_id};`
        );
    }
};