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
    const Name = req.body.userName;
    const Email = req.body.userEmail;
    const Phone = req.body.userPhone;
    const Password = req.body.userPassword;
    const user = await User.findOne({ where: { Email: Email } });
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
      bcrypt.hash(Password, saltRounds, async (err, hash) => {
        await User.create({
          Name,
          Email,
          Phone,
          Password: hash,
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
    const Email = req.body.loginEmail;
    const Password = req.body.loginPassword;

    const user = User.findOne({ where: { Email: Email } }).then((user) => {
      if (user) {
        bcrypt.compare(Password, user.Password, (err, result) => {
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


