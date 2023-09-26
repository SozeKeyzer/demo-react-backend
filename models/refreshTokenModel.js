const Sequelize = require('sequelize');
const sequelize = require('../database/connect');

const refreshTokenModel = sequelize.define('token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    refreshToken: {
        type: Sequelize.STRING
    }
});
module.exports = refreshTokenModel;