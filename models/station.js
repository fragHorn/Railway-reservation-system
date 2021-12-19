const db = require('../database/db');

module.exports = class Station {
    static getStations(){
        return db.execute('SELECT * FROM station');
    }
}