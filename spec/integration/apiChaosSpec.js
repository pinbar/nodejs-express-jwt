var app = require("../../app");
var request = require("request");
var config = require("../../config");
var baseUrl = "http://localhost:" + config.serverPort;

describe("Chaos API tests", function() {

    beforeAll(function() {
        app.start();
    });

    it("GET /oracle/choice, when called repeatedly returns a mix of 200 and 500", function(done){
        var noChaos = false;
        var chaos = false;
        var callCount = 1;
        var maxCallCount = 15;
        for(i = 0; (i <= maxCallCount); i++) {
            request.get(baseUrl + "/oracle/choice", function(error, response, body){
                if(response.statusCode === 200) {
                    noChaos = true;
                }
                if (response.statusCode === 500) {
                    chaos = true;
                }
                if(callCount === maxCallCount) {
                    expect(noChaos).toBe(true);
                    expect(chaos).toBe(true);
                    done();
                    return;
                }
                callCount++;
            });
        }
    });

    afterAll(function() {
        app.stop();
    });
});