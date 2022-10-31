const Sequelize4 = require('sequelize');
const seq4 = require('../config/connectdb.js');
const Announces = seq4.define('announce', {
    id: {
        type: Sequelize4.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize4.STRING,
        allowNull: false
    }
    
});
module.exports = Announces;
