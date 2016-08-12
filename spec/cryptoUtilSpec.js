var cryptoUtil = require("../cryptoUtil");

describe("Cryptography utility to encypt text. Used for encypting JWT payload", function(){

    describe("returns encrypted value", function(){
        it("encrypt a word", function() {
            expect(cryptoUtil.encrypt("someText")).toBe("810a515303857ba8");
        });
        it("encrypt a sentence", function() {
            expect(cryptoUtil.encrypt("some text")).toBe("810a5153779466a442");
        });
        it("encrypt special chars", function() {
            expect(cryptoUtil.encrypt("some.text?")).toBe("810a5153799466a4427a");
        });
        it("encrypt empty input", function() {
            expect(cryptoUtil.encrypt("")).toBe("");
        });
        it("encrypt blank input", function() {
            expect(cryptoUtil.encrypt(" ")).toBe("");
        });
        it("encrypt null input", function() {
            expect(cryptoUtil.encrypt(null)).toBe("");
        });
        it("encrypt null input", function() {
            expect(cryptoUtil.encrypt(null)).toBe("");
        });
        it("encrypt undefined input", function() {
            expect(cryptoUtil.encrypt(undefined)).toBe("");
        });
    });
    describe("returns decrypted value", function(){
        it("decrypt a word", function() {
            expect(cryptoUtil.decrypt("810a515303857ba8")).toBe("someText");
        });
        it("decrypt a sentence", function() {
            expect(cryptoUtil.decrypt("810a5153779466a442")).toBe("some text");
        });
        it("decrypt special chars", function() {
            expect(cryptoUtil.decrypt("810a5153799466a4427a")).toBe("some.text?");
        });
        it("decrypt empty input", function() {
            expect(cryptoUtil.decrypt("")).toBe("");
        });
        it("decrypt blank input", function() {
            expect(cryptoUtil.decrypt(" ")).toBe("");
        });
        it("decrypt null input", function() {
            expect(cryptoUtil.decrypt(null)).toBe("");
        });
        it("decrypt null input", function() {
            expect(cryptoUtil.decrypt(null)).toBe("");
        });
        it("decrypt undefined input", function() {
            expect(cryptoUtil.decrypt(undefined)).toBe("");
        });
    });
});