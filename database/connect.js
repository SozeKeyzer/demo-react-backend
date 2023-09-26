const Sequelize = require('sequelize');

const sequelize = new Sequelize('sih','root','password',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize; 