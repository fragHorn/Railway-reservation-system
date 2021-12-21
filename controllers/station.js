const Station = require('../models/station');
const TrainStation = require('../models/train-station');

exports.getHome = (req, res, next) => {
    Station.getStations()
    .then( stations => {
        res.status(200).json({
            stations: stations[0]
        })
    })
    .catch(err => {
        if(!err.statusCode)
         err.statusCode = 500;
        next(err);
    });
};

exports.postSearchTrains = (req, res, next) => {
    const fromStation = req.body.fromStation;
    const toStation = req.body.toStation;
    const [fromStationName, fromStationCode] = fromStation.split('-');
    const [toStationName, toStationCode] = toStation.split('-');
    TrainStation.getTrainsForStation(fromStationCode, toStationCode)
    .then(([trains]) => {
        res.status(201).json({
            trains: trains
        }); 
    })
    .catch(err => {
        if(!err.statusCode)
         err.statusCode = 500;
        next(err);
    });
};