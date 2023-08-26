const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  'group_chat_db',
  'root',
  'Abhi@2018041077',
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

module.exports = sequelize;