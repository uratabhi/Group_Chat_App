const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Todo = sequelize.define('todos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    todoName : Sequelize.STRING,
    description : Sequelize.STRING,
    isDone : Sequelize.STRING,
});

module.exports = Todo;