const db = require('../database/db');

module.exports = class Station {
    static getStations(){
        return db.execute('SELECT * FROM station');
    }
    static getStation(stationCode){
        return db.execute(
            `SELECT * FROM station
             WHERE 
             station.station_code = "${stationCode}";`
        );
    }
}