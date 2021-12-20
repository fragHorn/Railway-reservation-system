const Station = require('../models/station');
const db = require('./db');

exports.enterDataInStation = () => {
    return db.execute(
            `SELECT * FROM Station`
    )
    .then( ([output]) => {
        if(output.length === 0){
            return db.execute(
                `INSERT INTO station
                 VALUES 
                 ('NDLS', 'New Delhi'),
                 ('CNB', 'Kanpur Central'),
                 ('BSB', 'Varanasi'),
                 ('PRYJ', 'Prayagraj Jn.'),
                 ('LKO', 'Lucknow NR');`
            );
        }
        return Promise.resolve('Success');
    })
    .catch(err => {
        return Promise.resolve('Success');
    });
};

exports.enterDataInTrain = () => {
    return db.execute(
        `SELECT * FROM trains`
    )
    .then( ([output]) => {
         if(output.length === 0){
            return db.execute(
                `INSERT INTO trains
                 VALUES
                 (22435, "Vande Bharat Ex", 200),
                 (22436, "Vande Bharat Ex", 200),
                 (12559, "Shiv Ganga Exp", 300),
                 (12560, "Shiv Ganga Exp", 300),
                 (15657, "Brahmaputra Exp", 260),
                 (15658, "Brahmaputra Exp", 260),
                 (12801, "Purushottam Exp", 100),
                 (12802, "Purushottam Exp", 100),
                 (11107, "Bundelkhand Exp", 200),
                 (11108, "Bundelkhand Exp", 200),
                 (14511, "Nauchandi Exp", 400),
                 (14512, "Nauchandi Exp", 400),
                 (14209, "PYG LKO Intercity", 200),
                 (14210, "LKO PYG Intercity", 200),
                 (14215, "Ganga Gomti Exp", 250),
                 (82501, "IRCTC Tejas Exp", 200),
                 (82502, "IRCTC Tejas Exp", 200),
                 (12301, "Rajdhani Express", 250),
                 (20503, "Rajdhani Exp", 250),
                 (14207, "Padmavat Exp", 400),
                 (14208, "Padmavat Exp", 400),
                 (12229, "Lucknow Mail", 200),
                 (12230, "Lucknow Mail", 200),
                 (14216, "Ganga Gomti Express", 340),
                 (15076, "Triveni Express", 150),
                 (12318, "Akal Takhat Express", 150),
                 (13257, "Jansadharan Express", 250),
                 (13258, "Jansadharan Express", 250),
                 (12392, "Shramjivi Express", 250),
                 (22417, "Mahamana Express", 250),
                 (22418, "Mahamana Express", 250),
                 (12003, "Swaran Shatabdi", 250),
                 (12179, "AF Intercity", 250),
                 (20413, "Mahakal SF Exp", 250),
                 (12554, "Vaishali Exp", 250),
                 (12382, "Poorva Exp", 250),
                 (14863, "Marudhar Exp", 250),
                 (14864, "Marudhar Exp", 250),
                 (22178, "Mahanagari Exp", 250),
                 (12876, "Neelanchal Exp", 250),
                 (11109, "LJN Intercity", 250),
                 (19167, "Sabarmati Exp", 250),
                 (12420, "Gomti Exp", 250);`
            );
         }
         return Promise.resolve('Success');
    })
    .catch(err => {
        return Promise.resolve('Success');
    });
};

exports.enterTrainStationData = () => {
    return db.execute(
        `SELECT * FROM trainStation`
    )
    .then( ([output]) => {
       if(output.length === 0){
           return db.execute(
            `INSERT INTO trainStation 
             (arrival_time, departure_time, train_id, fromStation_id, toStation_id, train_fare)
             VALUES
             ("16:37:00", "18:30:00", 22435, "PRYJ", "CNB", 500),
             ("02:45:00", "04:50:00", 12301, "PRYJ", "CNB", 420),
             ("19:10:00", "21:30:00", 15658, "PRYJ", "CNB", 310),
             ("19:30:00", "21:55:00", 12801, "PRYJ", "CNB", 360),
             ("00:35:00", "02:45:00", 12559, "PRYJ", "CNB", 330),
             ("16:37:00", "23:00:00", 22435, "PRYJ", "NDLS", 700),
             ("02:45:00", "10:05:00", 12301, "PRYJ", "NDLS", 520),
             ("00:35:00", "08:25:00", 12559, "PRYJ", "NDLS", 500),
             ("19:30:00", "04:00:00", 12801, "PRYJ", "NDLS", 570),
             ("19:10:00", "04:30:00", 15658, "PRYJ", "NDLS", 490),
             ("12:10:00", "14:00:00", 22436, "PRYJ", "BSB", 500),
             ("12:10:00", "14:00:00", 22436, "PRYJ", "BSB", 500),
             ("03:55:00", "06:25:00", 12560, "PRYJ", "BSB", 370),
             ("03:55:00", "06:25:00", 12560, "PRYJ", "BSB", 370),
             ("07:15:00", "11:05:00", 11107, "PRYJ", "BSB", 300),
             ("17:20:00", "22:05:00", 14511, "PRYJ", "LKO", 370),
             ("15:20:00", "19:30:00", 14209, "PRYJ", "LKO", 400),
             ("15:20:00", "19:30:00", 14209, "PRYJ", "LKO", 360),
             ("05:40:00", "10:10:00", 14215, "PRYJ", "LKO", 430),
             ("06:10:00", "12:25:00", 82501, "LKO", "NDLS", 430),
             ("06:00:00", "13:38:00", 20503, "LKO", "NDLS", 400),
             ("21:55:00", "06:25:00", 14207, "LKO", "NDLS", 310),
             ("22:00:00", "06:55:00", 12229, "LKO", "NDLS", 350),
             ("07:35:00", "12:00:00", 14210, "LKO", "PRYJ", 350),
             ("18:10:00", "22:50:00", 14216, "LKO", "PRYJ", 400),
             ("05:10:00", "10:20:00", 14512, "LKO", "PRYJ", 330),
             ("16:50:00", "22:00:00", 15076, "LKO", "PRYJ", 300),
             ("20:15:00", "01:00:00", 12318, "LKO", "BSB", 200),
             ("22:00:00", "02:55:00", 13258, "LKO", "BSB", 180),
             ("21:30:00", "02:35:00", 12392, "LKO", "BSB", 210),
             ("03:15:00", "08:25:00", 22418, "LKO", "BSB", 200),
             ("06:10:00", "07:15:00", 82501, "LKO", "CNB", 600),
             ("15:35:00", "16:48:00", 12003, "LKO", "CNB", 500),
             ("15:55:00", "17:15:00", 12179, "LKO", "CNB", 350),
             ("19:20:00", "20:45:00", 20413, "LKO", "CNB", 320),
             ("15:40:00", "22:05:00", 82502, "NDLS", "LKO", 700),
             ("20:40:00", "04:42:00", 12554, "NDLS", "LKO", 400),
             ("13:35:00", "21:50:00", 13258, "NDLS", "LKO", 450),
             ("22:00:00", "06:50:00", 12230, "NDLS", "LKO", 350),
             ("19:50:00", "04:40:00", 14208, "NDLS", "LKO", 400),
             ("06:00:00", "10:08:00", 22436, "NDLS", "CNB", 800),
             ("15:40:00", "20:25:00", 82502, "NDLS", "CNB", 850),
             ("20:05:00", "01:00:00", 12560, "NDLS", "CNB", 550),
             ("22:40:00", "04:00:00", 12802, "NDLS", "CNB", 500),
             ("06:00:00", "14:00:00", 22436, "NDLS", "BSB", 800),
             ("20:05:00", "06:25:00", 12560, "NDLS", "BSB", 550),
             ("13:35:00", "02:55:00", 13258, "NDLS", "BSB", 650),
             ("17:40:00", "05:15:00", 12382, "NDLS", "BSB", 500),
             ("06:00:00", "12:08:00", 22436, "NDLS", "PRYJ", 900),
             ("20:05:00", "03:45:00", 12560, "NDLS", "PRYJ", 650),
             ("17:40:00", "01:45:00", 12382, "NDLS", "PRYJ", 500),
             ("23:40:00", "07:50:00", 15657, "NDLS", "PRYJ", 600),
             ("01:40:00", "05:50:00", 20503, "BSB", "LKO", 500),
             ("14:45:00", "19:10:00", 20413, "BSB", "LKO", 550),
             ("18:55:00", "23:48:00", 22417, "BSB", "LKO", 450),
             ("20:00:00", "02:05:00", 13257, "BSB", "LKO", 400),
             ("15:00:00", "23:00:00", 22435, "BSB", "NDLS", 900),
             ("22:15:00", "08:25:00", 12559, "BSB", "NDLS", 600),
             ("01:40:00", "13:38:00", 20503, "BSB", "NDLS", 650),
             ("18:55:00", "08:05:00", 22417, "BSB", "NDLS", 500),
             ("15:00:00", "18:30:00", 22435, "BSB", "CNB", 800),
             ("22:15:00", "02:45:00", 12559, "BSB", "CNB", 500),
             ("14:45:00", "20:45:00", 20413, "BSB", "CNB", 600),
             ("18:25:00", "02:00:00", 14863, "BSB", "CNB", 550),
             ("15:00:00", "16:35:00", 22435, "BSB", "PRYJ", 950),
             ("22:15:00", "00:30:00", 12559, "BSB", "PRYJ", 550),
             ("16:30:00", "20:55:00", 11108, "BSB", "PRYJ", 450),
             ("10:00:00", "13:00:00", 22178, "BSB", "PRYJ", 650),
             ("13:30:00", "14:55:00", 12876, "CNB", "LKO", 650),
             ("10:30:00", "12:00:00", 11109, "CNB", "LKO", 250),
             ("23:30:00", "01:00:00", 19167, "CNB", "LKO", 150),
             ("19:50:00", "21:25:00", 12420, "CNB", "LKO", 200),
             ("10:10:00", "12:08:00", 22436, "CNB", "PRYJ", 400),
             ("05:25:00", "07:50:00", 15657, "CNB", "PRYJ", 200),
             ("01:05:00", "03:45:00", 12560, "CNB", "PRYJ", 250),
             ("23:05:00", "01:45:00", 12382, "CNB", "PRYJ", 350),
             ("18:32:00", "23:00:00", 22435, "CNB", "NDLS", 750),
             ("07:20:00", "12:25:00", 82501, "CNB", "NDLS", 800),
             ("04:55:00", "10:05:00", 12301, "CNB", "NDLS", 600),
             ("16:53:00", "22:20:00", 12003, "CNB", "NDLS", 550),
             ("10:10:00", "14:00:00", 22436, "CNB", "BSB", 750),
             ("01:05:00", "06:25:00", 12560, "CNB", "BSB", 750),
             ("23:05:00", "05:15:00", 12382, "CNB", "BSB", 500),
             ("23:45:00", "06:40:00", 14864, "CNB", "BSB", 550);`
           );
       } 
       return Promise.resolve('Success');
    })
    .catch(err => {
        return Promise.resolve('Success');
    });
};
