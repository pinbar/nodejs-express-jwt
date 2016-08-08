var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwtUtil = require('jsonwebtoken');
var config = require('./config');
var authenticator = require('./authenticator');

var app = express();

var jsonParse = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended: false});

//for static resources
app.use(express.static('static'));

//load logger after static to ignore static logging
app.use(morgan('dev'));

app.get('/', function(request, response){
    response.send('Welcome to the Matrix!');
});

app.get('/metacortex', function(request, response){
    response.send('Mr Anderson\'s \"not so secure\" workplace!');
});

app.post('/authenticate', urlEncodedParser, function(request, response){
    var name = request.body.programName;
    var password = request.body.programPassword;
    if(!name || !password) {
        response.status(400).send('Bad request');
    } else {
        if(authenticator.authenticate(name, password)) {
            var claim = {
                program: name
            }
            var token = jwtUtil.sign(claim, config.jwtSecret, {
                expiresIn: 60
            });
            response.send('JWT: ' + token);
        } else {
            return response.status(401).end('Wrong credentials');
        }
    }
});

var apiRouter = express.Router();
apiRouter.use(function(request, response, next){
    var token = request.get('Authorization');
    if(token) {
        token = token.replace("Bearer ","");
        console.log("token: " + token);
        jwtUtil.verify(token, config.jwtSecret, function(error, decoded){
            if(error) {
                console.log("jwt error: " + error);
                response.status(401).send('Invalid Token. Error Message: ' + error);
            } else {
                request.decodedToken = decoded;
                next();
            }
        });
    } else {
        response.status(401).send('No access token found');
    }
});

//any routes below this will be protected
app.use('/api', apiRouter);

apiRouter.get('/megacity', function(request, response){
    response.send('Welcome to the Mega City!');
});

apiRouter.get('/levrai', function(request, response){
    var program = request.decodedToken.program;
    if(program === 'neo') {
        response.send(program + '! Welcome to Merovingian\'s \"secure\" restaurant!');
    } else {
        response.status(403).send(program + '! You are forbidden from entering Merovingian\'s \"secure\" restaurant!');
    }
});

//default fallthrough handler
app.use(function (req, res) {
    res.status(404).send('Resource Not Found');
});

var server = app.listen('8081', function(){
    console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});