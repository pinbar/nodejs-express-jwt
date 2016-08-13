var request = require("request");
var baseUrl = "http://localhost:8081/authenticate";

describe("API Authentication tests", function() {
    it("POST returns 200 for valid username password for neo", function(done){
        request.post({url: baseUrl, form: {programName:"neo", programPassword:"keanu"}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toContain("JWT");
            done();
        });
    });
    it("POST returns 200 for valid username password for morpheus", function(done){
        request.post({url: baseUrl, form: {programName:"morpheus", programPassword:"laurence"}}, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toContain("JWT");
            done();
        });
    });
    it("POST returns 401 for invalid password", function(done){
        request.post({url: baseUrl, form: {programName:"neo", programPassword:"laurence"}}, function(error, response, body){
            expect(response.statusCode).toBe(401);
            expect(body).toBe("Wrong credentials");
            done();
        });
    });
    it("POST returns 400 for empty username", function(done){
        request.post({url: baseUrl, form: {programName:"", programPassword:"laurence"}}, function(error, response, body){
            expect(response.statusCode).toBe(400);
            expect(body).toBe("Bad request");
            done();
        });
    });
    it("POST returns 400 for empty password", function(done){
        request.post({url: baseUrl, form: {programName:"neo", programPassword:""}}, function(error, response, body){
            expect(response.statusCode).toBe(400);
            expect(body).toBe("Bad request");
            done();
        });
    });
    it("POST returns 400 for empty username and password", function(done){
        request.post({url: baseUrl, form: {programName:"", programPassword:""}}, function(error, response, body){
            expect(response.statusCode).toBe(400);
            expect(body).toBe("Bad request");
            done();
        });
    });
});