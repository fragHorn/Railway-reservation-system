const db = require("./db");

exports.userTable = () => {
  db.execute(
    "CREATE TABLE IF NOT EXISTS users (id int auto_increment unique not null, name varchar(50), mobile_no int, email_id varchar(255), password varchar(255), primary key(id));"
  )
    .then(() => {
      // console.log("Table created Successfully...");
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createBookings = () => {
  db.execute(
    "CREATE TABLE IF NOT EXISTS bookings (id int auto_increment, from_station varchar(255), to_station varchar(255), no_of_passenger int, cost int, train_id int, user_id int, departure_time time(6), arrival_time time(6), primary key(id), foreign key(train_id) references trains(train_no), foreign key(user_id) references users(id));"
  )
    .then(() => {
      // console.log("Bookings table created successfully...");
      return;
    })
    .catch((err) => console.log(err));
};

exports.trainStationTable = () => {
  db.execute(
    "CREATE TABLE IF NOT EXISTS trainStation (id int auto_increment, arrival_time time(6), departure_time time(6), train_id int, station_id varchar(255), train_fare decimal, primary key(id), foreign key(train_id) references trains(train_no), foreign key(station_id) references station(station_code));"
  )
    .then(() => {
      // console.log("Train-station table created...");
      return;
    })
    .catch((err) => console.log(err));
};
