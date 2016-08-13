var authService = require("../../authService");

describe("Dummy service for authentication", function(){

    describe("authenticate a program", function(){
        it("valid username and password for neo", function() {
            expect(authService.authenticate("neo", "keanu")).toBe(true);
        });
        it("valid username and password for morpheus", function() {
            expect(authService.authenticate("morpheus", "laurence")).toBe(true);
        });
        it("valid username but incorrect password", function() {
            expect(authService.authenticate("neo", "laurence")).toBe(false);
        });
        it("empty username and password", function() {
            expect(authService.authenticate("", "")).toBe(false);
        });
        it("empty username and some password", function() {
            expect(authService.authenticate("", "some")).toBe(false);
        });
        it("some username and empty password", function() {
            expect(authService.authenticate("some", "")).toBe(false);
        });
    });
});