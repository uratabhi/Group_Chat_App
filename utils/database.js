const Sequelize = require('sequelize');

const sequelize = new Sequelize('tododb', 'root', 'Abhi@2018041077', {
     dialect : 'mysql', 
     host : 'localhost'
})

module.exports = sequelize;