var Sequelize4 = require('sequelize');
var seq4 = require('../config/connectdb.js');
var Announce = seq4.define('announce', {
    id: {
        type: Sequelize4.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize4.STRING,
        allowNull: true
    },
    title: {
        type: Sequelize4.STRING,
        allowNull: false
    }
});
module.exports = Announce;
