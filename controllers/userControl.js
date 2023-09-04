const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");


const generateAccessToken = (id, Email) => {
  return jwt.sign({ userId: id, Email: Email }, process.env.TOKEN);
};

const getMainPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "login.html"));
};



const postUserSignUP = async (req, res, next) => {
  try {
    const name = req.body.userName;
    const email = req.body.userEmail;
    const phone = req.body.userPhone;
    const password = req.body.userPassword;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res
        .status(403)
        .json(
            {
              success: false,
              message: "This email is already taken. Please choose another one.",
            }
        );
    } else {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        await User.create({
          name: name,
          email: email,
          phone: phone,
          password: hash,
        });
      });
     return res
        .status(200)
        .json({
           success: true,
           message: "User Created Successfully!",
        });
    }
  } catch (error) {
    console.log(error);
  }
};


const postUserLogin = async (req, res, next) => {
  try {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    const user = User.findOne({ where: { email: email } }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, message: "something  went wrong" });
          }
          if (result == true) {
            return res.status(200).json({
              success: true,
              message: "Login Successful!",
              token: generateAccessToken(user.id, user.email),
            });
          } else {
            return res.status(401).json({
              success: false,
              message: "Password Incorrect!",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User doesn't Exists!",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};















module.exports ={getMainPage, postUserSignUP, postUserLogin};


