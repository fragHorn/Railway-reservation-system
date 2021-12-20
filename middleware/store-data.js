const storeData = require('../database/store-data');

module.exports = () => {
    storeData.enterDataInStation()
    .then( value => storeData.enterDataInTrain())
    .then(() => console.log('Data entered successfully!!'))
    .catch(err => {
        if(!err.statusCode)
         err.statusCode = 500;
        throw err;
    });
    // next();
};