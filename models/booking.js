const db = require('../database/db');

module.exports = class Booking{
    constructor(fromStation, toStation, noOfPassenger, trainId, userId, cost, arrival_time, departure_time, date){
        return db.execute(`INSERT INTO bookings
           (from_station, 
            to_station, 
            no_of_passenger, 
            cost, 
            train_id, 
            user_id,
            departure_time, 
            arrival_time,
            journey_date)
            values
            ("${fromStation}", 
             "${toStation}", 
              ${noOfPassenger}, 
              ${cost}, 
              ${trainId}, 
              ${userId}, 
              "${departure_time}", 
              "${arrival_time}",
              "${date}"
              );`
        );
    }

    static checkTrainAvailability(trainId){
        return db.execute(`SELECT no_of_seats 
            from trains
            where trains.train_no = ${trainId};
        `);
    }

    static getJourneyTrains(userId){
        return db.execute(`
            SELECT * FROM 
            bookings 
            WHERE 
            bookings.user_id = ${userId};
        `);
    }
};