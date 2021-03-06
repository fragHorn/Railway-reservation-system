const express = require("express");

const authenticationRoutes = require("./routes/authentication");
const bodyParser = require("body-parser");
const {mongoConnect} = require('./database/db');
require('dotenv').config();

//initialize the express app
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Content-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//to parse the incoming requests
app.use(bodyParser.json());
//define the routes...

app.use("/authentication", authenticationRoutes);
app.use("/", (req, res, next) => {
  res.status(404).json({
    message: 'Page not found!!!'
  }); 
  next();
});


app.use((error, req, res, next) => {
  console.log(error);
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message;
  const errorData = error.data;
  res.status(errorStatus).json({ message: errorMessage, data: errorData, status: errorStatus });
});

mongoConnect(() => {
  app.listen(process.env.PORT || 8080);
});

