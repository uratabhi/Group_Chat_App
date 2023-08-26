const path = require('path');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");

const getMainPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "signup.html"));
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
















module.exports ={getMainPage, postUserSignUP};


