const TrainStation = require('../models/train-station');
const Booking = require("../models/booking");
const { validationResult } = require("express-validator");

exports.postBookTrain = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid details");
    error.data = errors.array();
    error.statusCode = 422;
    throw error;
  }
  const trainId = req.body.train_id;
  const fromStationCode = req.body.fromStation;
  const toStationCode = req.body.toStation;
  const noOfPassengers = Number(req.body.noOfPassengers);
  const userId = req.userId;
  let cost;
  // console.log(trainId, fromStationCode, toStationCode);
  Booking.checkTrainAvailability(trainId)
    .then((result) => {
      const [trainInfo] = result[0];
      if (trainInfo) {
        if (trainInfo.no_of_seats >= noOfPassengers){
          TrainStation.findTrain(trainId, fromStationCode, toStationCode)
          .then( ([train]) => {
            if(train.length > 0){
              const [trainDetails] = train;
              const {arrival_time, departure_time, train_fare} = trainDetails;
              cost = train_fare * noOfPassengers;
              new Booking(fromStationCode, toStationCode, noOfPassengers, trainId, userId, cost, arrival_time, departure_time)
              .then( () => {
                res.status(201).json({message: "Train booked successfully!!"});
              })
              .catch(err => {
                if(!err.statusCode)
                 err.statusCode = 500;
                next(err);
              });
            }
            else{
              const error = new Error('Oops train not found...!');
              error.statusCode = 500;
              throw error;
            }
          })
          .catch(err => {
            if(!err.statusCode)
             err.statusCode = 500;
            next(err);
          })
        }
        else {
          const error = new Error('Sorry no more seats available!');
          error.statusCode = 409;
          throw error;
        }
      } 
      else{
        const err = new Error('Oops train not found...!!');
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statuscode) err.statusCode = 500;
      next(err);
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
