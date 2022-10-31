const Sequelize = require('sequelize');

const sequelize = require('../config/connectdb.js');

const Registration = sequelize.define('registration', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    username: Sequelize.STRING,
    
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
});

module.exports = Registration;