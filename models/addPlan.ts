const Sequelize2 = require('sequelize');
const seq2 = require('../config/connectdb.js');
const addPlans = seq2.define('addplan', {
    id: {
        type: Sequelize2.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    type: {
        type: Sequelize2.STRING,
        allowNull: false
    },
    
    resourcename: {
        type: Sequelize2.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize2.STRING,
        allowNull: false
    },
    frequency: {
        type: Sequelize2.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize2.INTEGER,
        allowNull: false
    },
    defaultfee: {
        type: Sequelize2.INTEGER,
        allowNull: false
    },
    defaultdeposit: {
        type: Sequelize2.INTEGER,
        allowNull: false
    },
    defaultcontractlength: {
        type: Sequelize2.INTEGER,
        allowNull: false
    },



});
module.exports = addPlans;
