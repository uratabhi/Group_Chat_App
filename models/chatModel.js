const Sequelize = require("sequelize");
const sequelize = require("../utils/database");


const Chat = sequelize.define("chats", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Chat;