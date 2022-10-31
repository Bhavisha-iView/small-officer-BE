var Sequelize1 = require('sequelize');
var seq1 = require('../config/connectdb.js');
var addTypes = seq1.define('addtype', {
    id: {
        type: Sequelize1.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize1.STRING,
        allowNull: false
    },
    repeatbooking: {
        type: Sequelize1.INTEGER,
        allowNull: false
    },
    mintime: {
        type: Sequelize1.STRING,
        allowNull: false
    },
    cancletime: {
        type: Sequelize1.STRING,
        allowNull: false
    }
});
module.exports = addTypes;
