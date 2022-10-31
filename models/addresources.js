var Sequelize = require('sequelize');
var seq = require('../config/connectdb.js');
var Resources = seq.define('resources', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uploadimage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    personcapacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
module.exports = Resources;
