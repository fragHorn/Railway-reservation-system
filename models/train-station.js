const db = require('../database/db');

module.exports = class TrainStation{
    static getTrainsForStation(fromStation_code, toStation_code){
        return db.execute(`
            SELECT * 
            FROM trainStation 
            WHERE trainStation.fromStation_id = "${fromStation_code}"
            AND trainStation.toStation_id = "${toStation_code}";
        `);
    }

    static findTrain(trainId, fromStationcode, toStationCode){
        return db.execute(`
            SELECT * 
            FROM  trainStation
            WHERE 
            trainStation.fromStation_id = "${fromStationcode}" AND
            trainStation.toStation_id = "${toStationCode}" AND
            trainStation.train_id = "${trainId}";
        `);
    }
}