const bcrypt = require('bcrypt');
const Registration = require("../models/registration.js")
const Resources = require("../models/addresources.js")
const addTypes = require("../models/addtypes.js")
const addPlans = require("../models/addPlan.js")
const Users = require("../models/adduser.js")
const Announces = require("../models/addannounce.js")
const Infos = require("../models/addinfo.js")
const jwt = require('jsonwebtoken')
const transporter = require('../config/connectEmail.js');
const storage = require('../routes/Routes.js');
const sequelize = require('../config/connectdb.js');

const userRegistration = async (req, res) => {
    const user = req.body.username;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash(req.body.password, salt)
    //const pass = await bcrypt.hash(req.body.password, 10);
    //const id = req.body.id;
    Registration.create({
        username: user,
        email:email,
        password: pass,
        
    })
        .then(async result => {
            // console.log(result);
            const saved_user = await Registration.findOne({where:{ email: email}});
            //generate jwt token
            const token = jwt.sign({ userId: saved_user.id, userName: saved_user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.send({ "status": "succes", "message": "registration succesfully", "token": token });
            console.log('Created Product');
        })
        .catch(err => {
            console.log(err);
        });
    
}
const userLogin = async (req,res) => {
//  app.use(passport.initialize);
//  app.use(passport.session)
    console.log(req.body);
    const {email,password} = req.body;
       try {
           if(email && password){
             const user = await Registration.findOne({ where: { email: email } })
             console.log(user)
             if(user!== null){
                const isMatch = await bcrypt.compare(password, user.password)
                console.log(isMatch)
                console.log(user.email, email)
                if(user.email===email && isMatch){
                    //generate login jwt token
                    // const token = jwt.sign({ userId: user._id, userName: user.name,userEmail:user.email,userPassword:password,hashUserPassword:user.password }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.send({ "status": "success", "message": "Login succesfully"});
                }else{
                    res.send({ "status": "failed", "message": "This userId and Password are not correct" })
                }
             }else{
                 res.send({ "status": "failed", "message": "Not registered" })
             }
           }else{
               res.send({ "status": "failed", "message": "All fields are required" })
           }
       } catch (error) {
           console.log(error);
           res.send({ "status": "failed", "message": "Unable to login"});
       }
}

const deleteUser = async (req, res) => {

    const id = req.params.id;
    const deleteuser = await Infos.destroy({ where: { id: id } });
    console.log(id)
    
    res.send({ "status": "successfully deleted User","delete":deleteuser })
}

const getregistration = async (req, res) => {
    
        let register = await Registration.findAll({})
        console.log(register)
        res.send(register);
}


const sendUserPasswordResetEmail = async (req, res) => {
    const email = req.body.email
    
    if (email) {
        console.log(email);
        
       const user = await Registration.findOne({where:{ email : email }})
        
        console.log(user);
        if (user) {
            const secret = user.id + process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '15m' })
            const link = `http:/localhost:${3000}/api/user/login/reset-password/${user.id}/${token}`
            console.log(link);
            // Send Email
          let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "SmallOfficer - Password Reset Link",
          html: link
        })
            res.send({ "status": "success", "message": "Password reset , email sent , check your email","token":token,"info":info })
        } else {
            res.send({ "status": "failed", "message": "Email doesn't exists" })
        }

    } else {
        res.send({ "status": "failed", "message": "Email field is required" })
    }
}
const userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    console.log(id);
    const user = await Registration.findByPk(id)
    const new_secret = user.id + process.env.JWT_SECRET_KEY
    try {
        jwt.verify(token, new_secret)
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
                // await Registration.findByIdAndUpdate(user.id, { $set: { password: newHashPassword } })
                Registration.update(
                    {password: newHashPassword},
                    { where: { id: id } }).then(result =>
                        {
                            console.log(result)
                        }
                    )
                    .catch(err =>{
                        console.log(err);}
                    )
                res.send({ "status": "success", "message": "Password Reset Successfully" })
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Invalid Token" })
    }
}
const addResource = async (req, res) => {
     
    //await Resources.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
    const { name, description, type, location, personcapacity }= req.body;
    // const uploadimage = req.file.uploadimage
    const resourceDetail = await Resources.create(
        { 
          
          name: name, 
          description: description, 
        //   uploadimage: uploadimage,
          type:type,
          location:location,
          personcapacity:personcapacity
    });
    res.send({"status": "successfully add Resource", "Resource":resourceDetail})
    
     
}

const addType = async (req, res) => {

    const {type,repeatbooking,mintime,cancletime} = req.body;
    const typeDetail = await addTypes.create(
        {

            type: type,
            repeatbooking: repeatbooking,
            mintime: mintime,
            cancletime: cancletime
            
        });
    res.send({ "status": "successfully add Resource", "Resource": typeDetail })

}
const getTypes = async (req, res) => {
    
    let addtype = await addTypes.findAll({})
    res.send(addtype);
}
const getResources = async (req, res) => {

    let addresource = await Resources.findAll({})
    res.send(addresource);
}
const addPlan = async (req, res) => {

    const { type, resourcename, description, frequency,price,defaultfee,defaultdeposit,defaultcontractlength } = req.body;
    const planDetail = await addPlans.create(
        {

            type: type,
            resourcename: resourcename,
            description: description,
            frequency: frequency,
            price: price,
            defaultfee: defaultfee,
            defaultdeposit: defaultdeposit,
            defaultcontractlength: defaultcontractlength

        });
    res.send({ "status": "successfully add Plan", "Plan": planDetail })

}
const getPlan = async (req, res) => {

    let addplan = await addPlans.findAll({})
    res.send(addplan);
}
const addUser = async (req, res) => {

    //await Resources.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
    const { firstname,lastname, about,company,position,cityname,date } = req.body;
    const userDetail = await Users.create(
        {
            firstname: firstname,
            lastname: lastname,
            about: about,
            company: company,
            position: position,
            cityname: cityname,
            date: date
        });
    res.send({ "status": "successfully add Resource", "Resource": userDetail })


}
const getUser = async (req, res) => {

    let adduser = await Users.findAll({
        attributes : [
            'firstname',
            'lastname',
            'about',
            'company',
            'position',
            'cityname',
            'date'
        ]
    })
    res.send(adduser);

}

const getUserById = async (req, res) => {
    const id = req.params.id
    let adduserid = await Users.findOne({where: {id:id}})
    console.log(adduserid)
    res.send(adduserid)
}

const addAnnounce = async (req, res) => {

    const { title } = req.body;
    // const image = req.image
    // console.log(title, image)
    const announceDetail = await Announces.create(
        {

            title: title

        });
    res.send({ "status": "successfully add announcement", "Announcement": announceDetail })

}
const getAnnounce = async (req, res) => {

    let addannounce = await Announces.findAll({})
    res.send(addannounce);
}
const addInfo = async (req, res) => {

    const { title , description } = req.body;
    // const infoimage = req.file.infoimage
    const infoDetail = await Infos.create(
        {

            title: title,
            description: description


        });
    res.send({ "status": "successfully add Information", "Information": infoDetail })

}

const getInfo = async (req, res) => {

    let addinfo = await Infos.findAll({})
    res.send(addinfo);
}

const getInfoById = async (req, res) => {
    const id = req.params.id
    let addinfoid = await Infos.findOne({where: {id:id}})
    console.log(addinfoid)
    res.send(addinfoid)
}

const updateInfo = async (req, res) => {

    const id = req.params.id;
    const updateinfos = await Infos.update(req.body, { where: { id: id }});
    res.send({ "status": "successfully update Information", "Information": updateinfos })
}
const deleteInfo = async (req, res) => {

    const id = req.params.id;
    const deleteinfos = await Infos.destroy({ where: { id: id } });
    console.log(id)
    
    res.send({ "status": "successfully deleted Information","delete":deleteinfos })
}
module.exports = { userRegistration,userLogin, deleteUser, getregistration, sendUserPasswordResetEmail, userPasswordReset ,addResource,addType,getTypes,getResources,addPlan,getPlan,addUser,getUser, getUserById, addAnnounce,getAnnounce,addInfo,getInfo,getInfoById,updateInfo,deleteInfo};
