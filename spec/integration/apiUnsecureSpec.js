var request = require("request");
var baseUrl = "http://localhost:8081";

describe("Unsecure API tests", function() {
    it("GET base url returns 200", function(done){
        request.get(baseUrl, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toBe("Welcome to the Matrix!");
            done();
        });
    });
    it("POST wrong method base url returns 404", function(done){
        request.post(baseUrl, function(error, response, body){
            expect(response.statusCode).toBe(404);
            done();
        });
    });
    it("GET dummy url returns 404", function(done){
        request.post(baseUrl + "/someApi", function(error, response, body){
            expect(response.statusCode).toBe(404);
            done();
        });
    });
    it("GET /metacortex returns 200", function(done){
        request.get(baseUrl + "/metacortex", function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body).toBe("Mr Anderson's \"not so secure\" workplace!");
            done();
        });
    });
});