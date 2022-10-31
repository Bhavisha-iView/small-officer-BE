var Sequelize3 = require('sequelize');
var seq3 = require('../config/connectdb.js');
var Users = seq3.define('user', {
    id: {
        type: Sequelize3.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    profileimage: {
        type: Sequelize3.STRING,
        allowNull: true
    },
    firstname: {
        type: Sequelize3.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize3.STRING,
        allowNull: false
    },
    about: {
        type: Sequelize3.STRING,
        allowNull: false
    },
    company: {
        type: Sequelize3.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize3.STRING,
        allowNull: false
    },
    cityname: {
        type: Sequelize3.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize3.STRING,
        allowNull: false
    }
});
module.exports = Users;
