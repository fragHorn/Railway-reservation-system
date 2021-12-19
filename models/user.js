const db = require("../database/db");

module.exports = class User {
  constructor(emailId, password, name, mobileNo) {
    return db.execute(`INSERT INTO users
            (name, mobile_no, email_id, password)
            values
            ("${name}", "${mobileNo}", "${emailId}", "${password}");
        `);
  }

  static findUser(emailId) {
    return db.execute(`SELECT * FROM users
            where email_id = "${emailId}";
        `);
  }
};
