var Sequelize5 = require('sequelize');
var seq5 = require('../config/connectdb.js');
var Infos = seq5.define('info', {
    id: {
        type: Sequelize5.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    infoimage: {
        type: Sequelize5.STRING,
        allowNull: true
    },
    title: {
        type: Sequelize5.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize5.STRING,
        allowNull: true
    }
});
module.exports = Infos;
