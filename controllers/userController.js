const config = require("../config/index");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_SECRET;

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Please check data");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    // console.log("name:" + name + "password:" + password)
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({ message: "no such user found" });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = { id: user.id };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({
        message: "ok",
        token: token,
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        role: user.role,
      });
    } else {
      const error = new Error("Wrong password");
      error.statusCode = 422;
      throw error.message;
    }
  } catch (error) {
    res.status(500).json({
      errors: { error },
    });
  }
};

module.exports.signup = async (req, res) => {
  const { username, password, name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Please check data");
    error.statusCode = 422;
    error.validation = errors.array();
    throw error;
  }
  //count all user
  await User.find().countDocuments(async function (error, count) {
    if (error) {
      res.status(500).json({
        errors: { error },
      });
    }
    let newUser = new User({
      user_id: count + 1,
      username: username,
      name: name,
    });
    newUser.password = await newUser.encryptPassword(password);

    try {
      //find exist user
      const oldUser = await User.findOne({ username: username });
      if (oldUser === null) {
        //save new user
        await newUser.save();
        res.status(201).json({
          success: true,
          message: "Created new user.",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "User already exist.",
        });
      }
    } catch (err) {
      res.status(500).json({
        errors: { err },
      });
    }
  });
};
