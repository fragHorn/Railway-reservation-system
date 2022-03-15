const express = require("express");
const { body } = require("express-validator");
const authenticationController = require("../controllers/authentication");
const User = require("../models/user");
const tokenAuthenticator = require('../middleware/is-auth');

const router = express.Router();

router.post(
  "/signup",
  [
    body("email_id")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) => {
        const email = value;
        return User.findUser(email).then((user) => {
            console.log(user, email);
          if (user)
            return Promise.reject("Email address already exists!");
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Enter longer password (> 5 length)..."),
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name should not be empty!!"),
  ],
  authenticationController.postSignup
);

router.post("/login", authenticationController.postLogin);

// router.post("/logout", tokenAuthenticator);

module.exports = router;
