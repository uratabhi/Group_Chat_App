const path = require('path');
const Todo = require("../models/todoModel");

const getMainPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "signup.html"));
};

module.exports ={getMainPage};

