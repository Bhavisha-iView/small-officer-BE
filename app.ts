const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const db = require('./config/connectdb.js');
const Routes = require('./routes/Routes.js');
const session = require('express-session');
const flash = require('express-flash');
const sequelize = require('./config/connectdb.js');
const Reg = require("./models/registration.js")
const app = express();
const port = process.env.PORT;
app.use(express.json());






app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use("/api/user", Routes);
const intializingPassport = require('./config/passportConfig.js');
intializingPassport(passport, 
    username  => {return Reg.findOne({where:{username : username}})},
    id => {return Reg.findOne({where:{id : id}})})


app.use(passport.initialize());
app.use(passport.session());
app.listen(port,()=>{

    console.log(`server listening at http://localhost:${port}`);
})
sequelize.sync().then(result => {
    //console.log(result);
    //app.listen(3000);
}).catch(err => {
    console.log(err);
});
