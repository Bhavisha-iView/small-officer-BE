const express = require('express');
const router = express.Router();
const multer = require('multer');
// const { userRegistration, sendUserPasswordResetEmail, userPasswordReset,addResource,addType ,getTypes,getResources ,addPlan,getPlan,addUser,getUser,addAnnounce,getAnnounce,addInfo,getInfo} = require('../controllers/smallOfficer.js');
const smallOfficer = require('../controllers/smallOfficer.js');
const passport = require('passport');
const path = require('path');
const sequelize = require('../config/connectdb.js');
var logger = require("../logger.js")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: async (req, file, cb) => {
        const name = Date.now() + path.extname(file.originalname)
        console.log(name);
        var sql = `UPDATE small_officer.resources SET uploadimage ="${name}" WHERE id = id`;
        var sql1 = `UPDATE small_officer.users SET profileimage ="${name}" WHERE id = id`;
        var sql2 = `UPDATE small_officer.announces SET image ="${name}" WHERE id = id`;
        var sql3 = `UPDATE small_officer.infos SET infoimage ="${name}" WHERE id = id`;
        logger.info(sql);
        sequelize.query(sql, function (err, result) {
            if (err) throw err;
        });
        sequelize.query(sql1, function (err, result) {
            if (err) throw err;
        });
        sequelize.query(sql2, function (err, result) {
            if (err) throw err;
        });
        sequelize.query(sql3, function (err, result) {
            if (err) throw err;
        });
        cb(null, name)
    
    }
})
const upload = multer({storage:storage})
module.exports = storage;
//middelware


//public Routes
router.post('/register', smallOfficer.userRegistration);
router.get('/',
    (req,res) => {
        res.send('something went wrong !')
    }
)
// router.post('/login',
//     passport.authenticate('local', 
//     {  
//       failureflash: true ,
//     failureRedirect: '/'   
// }),
//     function (req, res) {
//         console.log('hi');
//         res.json(req.user);
//     });

router.post('/login',smallOfficer.userLogin)
router.post('/signout',smallOfficer.deleteUser)
router.get('/Register', smallOfficer.getregistration)
router.post('/send-reset-password-email',smallOfficer.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', smallOfficer.userPasswordReset)
router.post('/addResource', upload.single("uploadimage"), smallOfficer.addResource)
router.post('/addType', smallOfficer.addType)
router.get('/AddType', smallOfficer.getTypes)
router.get('/AddResource', smallOfficer.getResources)
router.post('/addPlan', smallOfficer.addPlan)
router.get('/AddPlan', smallOfficer.getPlan)
router.post('/addUser', smallOfficer.addUser)
router.get('/AddUser', smallOfficer.getUser)
router.get('/AddUser/:id', smallOfficer.getUserById)
router.post('/addAnnounce', upload.single("image"), smallOfficer.addAnnounce)
router.get('/AddAnnounce', smallOfficer.getAnnounce)
router.post('/addInfo', upload.single("infoimage"), smallOfficer.addInfo)
router.get('/AddInfo', smallOfficer.getInfo)
router.get('/AddInfo/:id', smallOfficer.getInfoById)
router.put('/UpdateInfo/:id',smallOfficer.updateInfo)
router.delete('/DeleteInfo/:id', smallOfficer.deleteInfo)
module.exports = router;