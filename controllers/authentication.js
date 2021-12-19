const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Credentials, please try again");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const userName = req.body.name;
  const userEmail = req.body.email_id;
  const password = req.body.password;
  const userMobileNo = req.body.mobileNo;
  bcryptjs
    .hash(password, 12)
    .then((hashedPassword) => {
      new User(userEmail, hashedPassword, userName, userMobileNo)
        .then(() => {
          res.status(201).json({
            message: "User created succesfully!!",
          });
        })
        .catch((err) => {
          if (!err.statusCode) err.statusCode = 500;
          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email_id;
  const password = req.body.password;
  let matchedUser;
  User.findUser(email)
    .then(([user]) => {
      if (user.length === 0) {
        const error = new Error("No such email id found!!!");
        error.statusCode = 401;
        throw error;
      }
      [matchedUser] = user;
      return bcryptjs.compare(password, user[0].password);
    })
    .then((isCorrect) => {
      if (!isCorrect) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          emailId: matchedUser.email_id,
          userId: matchedUser.id,
        },
        `process.env.JWT_SECRET_KEY`,
        { expiresIn: "1h" }
      );
      res.status(200).json({token: token, userId: matchedUser.id });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.postLogout = (req, res, next) => {
//   const userId = req.userId;
// };