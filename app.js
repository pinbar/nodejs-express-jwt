var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var jsonwebtoken = require("jsonwebtoken");
var config = require("./config");
var authService = require("./authService");
var cryptoUtil = require("./cryptoUtil");

var app = express();

/* begin swagger setup */
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Matrix API',
            version: '1.0.0',
            description: 'Demo of express, jwt, crypto, chaos and swagger',
        },
    },
    apis: ['app.js'],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/* end swagger setup */

var jsonParse = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended: false});

//for static resources
app.use(express.static("static"));

//load logger after static to ignore static logging
app.use(morgan("dev"));

app.get("/", function(request, response){
    response.send("Welcome to the Matrix!");
});

/**
 * @swagger
 * /metacortex:
 *    get:
 *      description: Unsecured endpoint
 *      produces: text
 *      responses:
 *          200: 
 *              description: Success
 */
app.get("/metacortex", function(request, response){
    response.status(200).send("Mr Anderson\'s \"not so secure\" workplace!");
});

app.post("/authenticate", urlEncodedParser, function(request, response){
    var name = request.body.programName;
    var password = request.body.programPassword;
    if(!name || !password) {
        response.status(400).send("Bad request");
    } else {
        if(authService.authenticate(name, password)) {
            var claim = {
                program: cryptoUtil.encrypt(name),
                role: cryptoUtil.encrypt("redpill")
            }
            var token = jsonwebtoken.sign(claim, config.jwtSecret, {
                expiresIn: config.jwtExpiresInSec
            });
            response.send("JWT: " + token);
        } else {
            return response.status(401).end("Wrong credentials");
        }
    }
});

var apiRouter = express.Router();
apiRouter.use(function(request, response, next){
    var token = request.get("Authorization");
    if(token && token.includes("Bearer")) {
        token = token.replace("Bearer ","");
        jsonwebtoken.verify(token.trim(), config.jwtSecret, function(error, decoded){
            if(error) {
                console.log("jwt error: " + error);
                response.status(401).send("Invalid Token. Error Message: " + error);
            } else {
                request.decodedToken = decoded;
                return next();
            }
        });
    } else {
        response.status(401).send("No access token found");
    }
});
//any routes that use apiRouter will be protected
app.use("/api", apiRouter);

/**
 * @swagger
 * /megacity:
 *    get:
 *      description: Secured endpoint that can only be accessed with a jwt
 *      produces: text
 *      parameters:
 *        - in: header
 *          required: true
 *          name: Authorization
 *          description: Bearer some.access.token
 *          schema:
 *              type: string
 *      responses:
 *          200: 
 *              description: Success
 *          401: 
 *              description: Missing, malformed or invalid access token
 *          403: 
 *              description: Token with incorrect scope
 */
apiRouter.get("/megacity", function(request, response){
    response.send("Welcome to the Mega City!");
});

apiRouter.get("/levrai", function(request, response){
    var encryptedProgram = request.decodedToken.program;
    var program = cryptoUtil.decrypt(encryptedProgram);
    if(program === "neo") {
        response.send(program + ", welcome to merovingian\'s \"secure\" restaurant!");
    } else {
        response.status(403).send(program + ", you are forbidden from entering merovingian\'s \"secure\" restaurant!");
    }
});

var chaosApiRouter = express.Router();
chaosApiRouter.use(function(request, response, next){
    if(config.causeChaos && Math.random() < config.chaosProbability) {
        response.status(500).send("Anomaly found!!");
    } else {
       return next();
    }
});
//any routes that use chaosApiRouter will randomly throw an error
app.use("/oracle", chaosApiRouter);

chaosApiRouter.get("/choice", function(request, response){
    response.send("Equation is balanced!!");
});

//default fallthrough handler
app.use(function (req, res) {
    res.status(404).send("Resource Not Found");
});

var server;
module.exports = {
    start: function() {
        server = app.listen(config.serverPort, function(){
            console.log("app started");
        });
    },
    stop: function() {
        server.close(function(){
            console.log("app stopped");
        });
    }
}