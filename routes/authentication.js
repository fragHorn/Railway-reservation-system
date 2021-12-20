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
        return User.findUser(value).then((user) => {
            console.log(user);
          if (user[0].length > 0)
            return Promise.reject("Email address already exists!");
        });
      })
      .normalizeEmail(),
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
