const TrainStation = require('../models/train-station');
const Booking = require("../models/booking");
const { validationResult } = require("express-validator");
const DateTrain = require('../models/date-train');
const Station = require('../models/station');
const Train = require('../models/train');

exports.getBookPage = (req, res, next) => {
  res.render('form', {
    pageTitle: 'Form'
  });
};

exports.postBookTrain = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid details");
    error.data = errors.array();
    error.statusCode = 422;
    throw error;
  }
  const trainId = Number(req.body.train_id);
  const fromStationCode = req.body.fromStation;
  const toStationCode = req.body.toStation;
  const noOfPassengers = Number(req.body.noOfPassengers);
  const date = req.body.date;
  const userId = req.userId;
  let cost;
  let fromStationName, toStationName, trainName;
  TrainStation.findTrain(trainId, fromStationCode, toStationCode)
  .then(([train]) => {
    if (train.length > 0) {
      DateTrain.checkForSeats(trainId, noOfPassengers, date)
      .then( () => {
        const [trainDetails] = train;
        const {arrival_time, departure_time, train_fare} = trainDetails;
        cost = train_fare * noOfPassengers;
        new Booking(fromStationCode, toStationCode, noOfPassengers, trainId, userId, cost, arrival_time, departure_time)
        .then( () => {
          return DateTrain.updateSeats(date, noOfPassengers, trainId)
        })
        .then( () => {
          res.status(201).json({message: "Train booked successfully!!"});
        })
        .catch(err => {
          const error = new Error('No more seats available');
          err.statusCode = 409;
          next(error);
        });
      })
      .catch(err => {
        const error = new Error('Sorry, no more seats available!!!');
        error.statusCode = 409;
        next(error);
      });
    }
    else {
      const error = new Error('Sorry, train not found!!!');
      error.statusCode = 409;
      throw error;
    } 
  })
  .catch((err) => {
    const error = new Error('Train not found!!!');
    error.statusCode = 409;
    next(error);
  });
};

exports.getJourneys = (req, res, next) => {
  const userId = req.userId;
  Booking.getJourneyTrains(userId)
  .then( ([trains]) => {
    if(trains.length > 0){
      res.status(200).json({
        trains: trains,
        message: 'Trains found!!'
      });
    }
    else{
      res.status(200).json({
        trains: [],
        message: "No previous journey found!!"
      });
    }
  })
  .catch(err => {
    if(!err.satusCode)
     err.statusCode = 500;
    next(err);
  })
};
