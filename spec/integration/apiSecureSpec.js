var app = require("../../app");
var request = require("request");
var config = require("../../config");
var baseUrl = "http://localhost:" + config.serverPort + "/api";
var authUrl = "http://localhost:" + config.serverPort + "/authenticate";
var jwtForNeo;
var jwtForMorpheus;

describe("Secure API tests", function() {

    beforeAll(function() {
        app.start();
    });

    it("GET /megacity without token returns 401", function(done){
        request.get(baseUrl + "/megacity", function(error, response, body){
            expect(response.statusCode).toBe(401);
            expect(body).toBe("No access token found");
            done();
        })
    });
    it("Get JWT for Neo", function(done){
        request.post({url: authUrl, form: {programName:"neo", programPassword:"keanu"}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            jwtForNeo = body.replace("JWT: ", "");
            done();
        });
    });
    it("Get JWT for Morpheus", function(done){
        request.post({url: authUrl, form: {programName:"morpheus", programPassword:"laurence"}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            jwtForMorpheus = body.replace("JWT: ", "");
            done();
        });
    });
    it("GET /megacity with neo's token returns 200", function(done){
        request.get({url: baseUrl + "/megacity", headers: {Authorization:"Bearer "+ jwtForNeo}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toBe("Welcome to the Mega City!");
            done();
        });
    });
    it("GET /levrai with neo's token returns 200", function(done){
        request.get({url: baseUrl + "/levrai", headers: {Authorization:"Bearer "+ jwtForNeo}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toBe("neo, welcome to merovingian's \"secure\" restaurant!");
            done();
        });
    });
    it("GET /levrai with morpheus's token returns 403", function(done){
        request.get({url: baseUrl + "/levrai", headers: {Authorization:"Bearer "+ jwtForMorpheus}}, function(error, response, body){
            expect(response.statusCode).toBe(403);
            expect(body).toBe("morpheus, you are forbidden from entering merovingian\'s \"secure\" restaurant!");
            done();
        });
    });
    it("GET /megacity with a malformed token returns 401", function(done){
        request.get({url: baseUrl + "/megacity", headers: {Authorization:"Bearer "+ "some malformed jwt"}}, function(error, response, body){
            expect(response.statusCode).toBe(401);
            expect(body).toBe("Invalid Token. Error Message: JsonWebTokenError: jwt malformed");
            done();
        });
    });
    it("GET /megacity with an invalid token returns 401", function(done){
        request.get({url: baseUrl + "/megacity", headers: {Authorization:"Bearer "+ "badHeader.badPayload.badSignature"}}, function(error, response, body){
            expect(response.statusCode).toBe(401);
            expect(body).toBe("Invalid Token. Error Message: JsonWebTokenError: invalid token");
            done();
        });
    });
    it("GET /megacity with an invalid signature returns 401", function(done){
        request.get({url: baseUrl + "/megacity", headers: {Authorization:"Bearer "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9ncmFtIjoiOWMwMDUzIiwicm9sZSI6Ijg2MGQ1OTc5Mzk4NSIsImlhdCI6MTQ3MTA5ODY1MywiZXhwIjoxNDcxMDk4ODMzfQ.X0NsujGplPIVSJ4NrGoU1sNu7KWRN-bYCt3PHL10Vk"}}, function(error, response, body){
            expect(response.statusCode).toBe(401);
            expect(body).toBe("Invalid Token. Error Message: JsonWebTokenError: invalid signature");
            done();
        });
    });

    afterAll(function() {
        app.stop();
    });
});