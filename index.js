var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config');

var app = express();
app.use(express.static('static'));

//load logger after static to ignore static logging
app.use(morgan('dev'));

var jsonParse = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function(request, response){
    response.send('Welcome to the Matrix!');
});

app.get('/metacortex', function(request, response){
    response.send('Mr Anderson\'s \"not so secure\" workplace!');
});

app.post('/authenticate', urlEncodedParser, function(request, response){
    if(!request.body.applicationName && !request.body.applicationPassword) {
        response.status(400).send('Bad request');
    } else {
        apiCredentials = {
            name: request.body.applicationName,
            password: request.body.applicationPassword
        }
        //credentials can be obtained from a DB
        if(apiCredentials.name != config.appName && apiCredentials.password != config.appPassword) {
            return response.status(401).end('Wrong password');
        } else {
            var claim = {
                app: apiCredentials.name,
                role: 'all'
            }
            var token = jwt.sign(claim, config.jwtSecret, {
                expiresIn: 60
            });
            response.send('JWT token created. Send the token in the header to make secure calls, like so => \n Authorization: Bearer ' + token);
        }
    }
});

var apiRouter = express.Router();
apiRouter.use(function(request, response, next){
    var token = request.get('Authorization');
    if(token) {
        token = token.replace("Bearer ","");
        console.log("token: " + token);
        jwt.verify(token, config.jwtSecret, function(error, decoded){
            if(error) {
                console.log("jwt error: " + error);
                response.status(401).send('Token not authenticated. Error Message: ' + error);
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

apiRouter.get('/levrai', function(request, response){
    response.send('Merovingian\'s \"secure\" restaurant!');
});

var server = app.listen('8081', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});

//default fallthrough handler
app.use(function (req, res) {
    res.status(404).send('Resource Not Found');
});