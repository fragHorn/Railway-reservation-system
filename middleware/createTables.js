const createTables = require('../database/create-tables');
const storeData = require('../middleware/store-data');

module.exports = (req, res, next) => {
    createTables.createStationsTable()
    .then( () => createTables.createTrainsTable())
    .then( () => createTables.userTable())
    .then( () => createTables.createBookings())
    .then( () => createTables.trainStationTable())
    .then(() => {
        console.log('created');
        storeData();
    })
    .catch(err => {
      if(!err.statusCode)
       err.statusCode = 500;
      throw err;
    });
    // next();
  };