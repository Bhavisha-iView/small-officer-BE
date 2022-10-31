var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var passport = require('passport');
var db = require('./config/connectdb.js');
var Routes = require('./routes/Routes.js');
var cors = require('cors');
var session = require('express-session');
var flash = require('express-flash');
var sequelize = require('./config/connectdb.js');
var Reg = require("./models/registration.js");
var logger = require("./logger.js")
var app = express();
var port = process.env.PORT;
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors());
app.use(express.json());
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use("/api/user", Routes);
var intializingPassport = require('./config/passportConfig.js');
intializingPassport(passport, function (username) 
{ return Reg.findOne({ where: { username: username } }); }, function (id) 
{ return Reg.findOne({ where: { id: id } }); });
app.use(passport.initialize());
app.use(passport.session());

//swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: "Small_Officer",
                version: "1.0.0",
                title: "Small_Officer",
                termsOfService: "http://swagger.io/terms/",
                email: "jigar.prajapati@iviewlabs.net",
            servers: ["https://small-officer.herokuapp.com/"]
            //servers: ["http://localhost:8000/"]
        }
        
    },
    // ['.routes/*.js']
    apis: ["app.js"],
    basePath: "/api/user",

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /api/user/register:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *       - name: Registration
 *         in: body
 *         schema:
 *            type: object
 *            properties: 
 *               username:
 *                  type: string
 *               email: 
 *                  type: string
 *               password:
 *                  type: string 
 *        
 *         
 */
/**
 * @swagger
 * /api/user/login:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *       - name: Login
 *         in: body
 *         schema:
 *            type: object
 *            properties: 
 *               username:
 *                  type: string
 *               password:
 *                  type: string 
 *        
 *         
 */
/**
 * @swagger
 * /api/user/send-reset-password-email:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *       - name: Send Reset Email
 *         in: body
 *         schema:
 *            type: object
 *            properties:               
 *               email: 
 *                  type: string         
 */
/**
 * @swagger
 * /api/user/reset-password/:
 *  post: 
 *    description: API- reset-password:id:token
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *       - name: Reset Password 
 *         in: body
 *         schema:
 *            type: object
 *            properties: 
 *               password:
 *                  type: string 
 *               password_confirmation:
 *                  type: string
 *        
 *         
 */
/**
 * @swagger
 * /api/user/addResource:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    consumes:
 *        - multipart/form-data
 *    parameters:
 *       - name: uploadimage
 *         in: formData
 *         type: file
 *       - in: formData
 *         name: name
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: type
 *         type: string
 *       - in: formData
 *         name: location
 *         type: string
 *       - in: formData
 *         name: personcapacity
 *         type: integer
 *         
 *        
 *         
 */
/**
 * @swagger
 * /api/user/addType:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *       - name: Add Type
 *         in: body
 *         schema:
 *            type: object
 *            properties:               
 *               email: 
 *                  type: string
 *               type:
 *                  type: string  
 *               repeatbooking:
 *                   type: integer
 *               mintime:
 *                   type: string
 *               cancletime:
 *                   type: string       
 */
/**
 * @swagger
 * /api/user/AddType:
 *  get:
 *    description: Use to request all Types
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *           
 *         
 */
/**
 * @swagger
 * /api/user/AddResource:
 *  get:
 *    description: Use to request all Types
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *           
 *         
 */
/**
 * @swagger
 * /api/user/addPlan:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *       - name: Add Plan
 *         in: body
 *         schema:
 *            type: object
 *            properties:               
 *               type:
 *                  type: string  
 *               resourcename:
 *                   type: string
 *               description:
 *                   type: string
 *               frequency:
 *                   type: string 
 *               price:
 *                   type: integer
 *               defaultfee:
 *                   type: integer
 *               defaultdeposit:
 *                   type: integer
 *               defaultcontractlength:
 *                   type: integer     
 */
/**
 * @swagger
 * /api/user/AddPlan:
 *  get:
 *    description: Use to request all Types
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *           
 *         
 */
/**
 * @swagger
 * /api/user/addUser:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    consumes:
 *        - multipart/form-data
 *    parameters:
 *       - name: profileimage
 *         in: formData
 *         type: file
 *       - in: formData
 *         name: firstname
 *         type: string
 *       - in: formData
 *         name: lastname
 *         type: string
 *       - in: formData
 *         name: about
 *         type: string
 *       - in: formData
 *         name: company
 *         type: string
 *       - in: formData
 *         name: position
 *         type: string
 *       - in: formData
 *         name: cityname
 *         type: string
 *       - in: formData
 *         name: date
 *         type: string
 *         
 *        
 *         
 */
/**
 * @swagger
 * /api/user/AddUser:
 *  get:
 *    description: Use to request all User
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *           
 *         
 */
/**
 * @swagger
 * /api/user/addAnnounce:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    consumes:
 *        - multipart/form-data
 *    parameters:
 *       - name: image
 *         in: formData
 *         type: file
 *       - in: formData
 *         name: title
 *         type: string
 */
/**
 * @swagger
 * /api/user/AddAnnounce:
 *  get:
 *    description: Use to request all Announcment
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *           
 *         
 */
/**
 * @swagger
 * /api/user/addInfo:
 *  post: 
 *    responses:
 *      '200':
 *        description: A successful response
 *    consumes:
 *        - multipart/form-data
 *    parameters:
 *       - name: infoimage
 *         in: formData
 *         type: file
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 */
/**
 * @swagger
 * /api/user/AddInfo:
 *  get:
 *    description: Use to request all Information
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *           
 *         
 */
/**
 * @swagger
 * /api/user/UpdateInfo/3:
 *  put:
 *    description: Use to update Information
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *    parameters:
 *       - name: info
 *         in: body
 *         schema:
 *            type: object
 *            properties: 
 *                infoimage: 
 *                  type: string
 *                title: 
 *                  type: string
 *                description:
 *                  type: string 
 *       
 *    
 *           
 *         
 */
/**
 * @swagger
 * /api/user/DeleteInfo/2:
 *  delete:
 *    description: Use to request all Information
 *    responses:
 *      '200':
 *        description: A successful response
 *    
 *    
 *           
 *         
 */
app.get("/customers", (req, res) => {
    res.status(200).send("Customer results");
});


app.listen(port, function () {
    logger.info("server listening at http://localhost:".concat(port));
});
sequelize.sync().then(function (result) {
    console.log('connected');
    // app.listen(3000);
})["catch"](function (err) {
    console.log(err);
});
