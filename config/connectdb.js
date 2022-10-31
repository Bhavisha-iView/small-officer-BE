// const mysql = require('mysql');

// const con = mysql.createConnection({
//     database: "test",
//     host: "localhost",
//     user: "root",
//     password: "jigar@2001"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


// module.exports = {con}
const Sequelize = require('sequelize');
const logger = require("../logger.js");

const sequelize = new Sequelize('small_officer', 'small_officer', 'RRNNUapN1GRQ', {
    dialect: 'mysql',
    host: 'internal-databases.cwq4vr0vajz0.ap-south-1.rds.amazonaws.com',
    //logging: msg => logger.info(msg) //for printing the log in logger(app.log)
    logging: false // for not printing the log in cmd or logger
});

module.exports = sequelize;
