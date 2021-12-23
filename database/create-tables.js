const db = require("./db");

exports.userTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS users 
     (id int auto_increment unique not null, 
      name varchar(50), 
      mobile_no varchar(20), 
      email_id varchar(255), 
      password varchar(255), 
      primary key(id));`
  )
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
       journey_date date,
       primary key(id), 
       foreign key(train_id) references trains(train_no),
       foreign key(user_id) references users(id));`
  )
};

exports.trainStationTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS trainStation 
      (id int auto_increment, 
       arrival_time time(6), 
       departure_time time(6), 
       train_id int, 
       fromStation_id varchar(255),
       toStation_id varchar(255), 
       train_fare decimal, 
       primary key(id), 
       foreign key(train_id) references trains(train_no), 
       foreign key(fromStation_id) references station(station_code),
       foreign key(toStation_id) references station(station_code));`
  )
};

exports.createStationsTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS station
      (station_code varchar(255) not null,
       station_name varchar(255),
       primary key(station_code));`
  )
};

exports.createTrainsTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS trains
     (train_no int not null, 
      train_name varchar(255),
      no_of_seats int,
      primary key(train_no));`
  )
};

exports.createDateTrainTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS dateTrain
     (id int not null auto_increment,
      trainDate date,
      train_id int, 
      no_of_seats int not null,
      primary key(id),
      foreign key(train_id) references trains(train_no));`
  );
};