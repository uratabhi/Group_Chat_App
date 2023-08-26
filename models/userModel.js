const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Name: Sequelize.STRING,
    Email: Sequelize.STRING,
    Phone: Sequelize.STRING,
    Password: Sequelize.STRING,
  });
  
  module.exports = User;