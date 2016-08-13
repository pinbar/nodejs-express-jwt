var request = require("request");
var baseUrl = "http://localhost:8081/api";
var authUrl = "http://localhost:8081/authenticate";
var jwt;

describe("Secure API tests", function() {
    it("GET /megacity without token returns 401", function(done){
        request.get(baseUrl + "/megacity", function(error, response, body){
            expect(response.statusCode).toBe(401);
            expect(body).toBe("No access token found");
            done();
        })
    });
    it("Authenitcate call returns 200 for valid username and password for neo", function(done){
        request.post({url: authUrl, form: {programName:"neo", programPassword:"keanu"}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            jwt = body.replace("JWT: ", "");
            done();
        });
    });
    it("GET /megacity with token returns 200", function(done){
        request.get({url: baseUrl + "/megacity", headers: {Authorization:"Bearer "+ jwt}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toBe("Welcome to the Mega City!");
            done();
        });
    });
    it("GET /levrai with neo's token returns 200", function(done){
        request.get({url: baseUrl + "/levrai", headers: {Authorization:"Bearer "+ jwt}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toBe("neo, welcome to merovingian's \"secure\" restaurant!");
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
});