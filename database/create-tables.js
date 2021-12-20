const db = require("./db");

exports.userTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS users 
     (id int auto_increment unique not null, 
      name varchar(50), 
      mobile_no int, 
      email_id varchar(255), 
      password varchar(255), 
      primary key(id));`
  )
    // .then(() => {
    //   console.log("Users table created Successfully...");
    // })
    // .catch((err) => {
    //   if(!err.statusCode)
    //    err.statusCode = 500;
    //   throw err;
    // });
};

exports.createBookings = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS bookings 
      (id int auto_increment,
       from_station varchar(255), 
       to_station varchar(255), 
       no_of_passenger int, 
       cost int, 
       train_id int, 
       user_id int, 
       departure_time time(6), 
       arrival_time time(6), 
       primary key(id), 
       foreign key(train_id) references trains(train_no),
       foreign key(user_id) references users(id));`
  )
  // .then(() => {
  //   console.log("Bookings table created successfully...");
  // })
  // .catch((err) => {
  //   if(!err.statusCode)
  //     err.statusCode = 500;
  //   throw err;
  // });
};

exports.trainStationTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS trainStation 
      (id int auto_increment, 
       arrival_time time(6), 
       departure_time time(6), 
       train_id int, 
       station_id varchar(255), 
       train_fare decimal, 
       primary key(id), 
       foreign key(train_id) references trains(train_no), 
       foreign key(station_id) references station(station_code));`
  )
  // .then(() => {
  //   console.log("Train-station table created...");
  // })
  // .catch((err) => {
  //   if(!err.statusCode)
  //    err.statusCode = 500;
  //   throw err;
  // });
};

exports.createStationsTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS station
      (station_code varchar(255) not null,
       station_name varchar(255),
       primary key(station_code));`
  )
  // .then(() => {
  //   console.log('Station table created successfull1...');
  // })
  // .catch(err => {
  //   if(!err.statusCode)
  //    err.statusCode = 500;
  //   throw err;
  // });
};

exports.createTrainsTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS trains
     (train_no int not null, 
      train_name varchar(255),
      no_of_seats int not null,
      primary key(train_no));`
  )
  // .then(() => {
  //   console.log('Trains table created successfully...');
  // })
  // .catch(err => {
  //   if(!err.statusCode)
  //    err.statusCode = 500;
  //   throw err;
  // });
};