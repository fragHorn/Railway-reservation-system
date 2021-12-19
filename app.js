const express = require("express");
const trainRoutes = require("./routes/station");
const bookingRoutes = require("./routes/booking");
const authenticationRoutes = require("./routes/authentication");
const createTables = require("./database/create-tables");
const bodyParser = require("body-parser");
const helmet = require('helmet');
//initialize the express app
const app = express();

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Content-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((req, res, next) => {
  createTables.userTable();
  createTables.createBookings();
  createTables.trainStationTable();
  next();
});

//to parse the incoming requests
app.use(bodyParser.json());
//define the routes...

app.use(trainRoutes);
app.use(bookingRoutes);
app.use("/authentication", authenticationRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message;
  const errorData = error.data;
  res.status(errorStatus).json({ message: errorMessage, data: errorData });
});

app.listen(process.env.PORT || 8080);
