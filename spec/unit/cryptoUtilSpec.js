var cryptoUtil = require("../../cryptoUtil");

describe("Cryptography utility to encypt text. Used for encypting JWT payload", function(){

    describe("returns encrypted value", function(){
        it("encrypt a word", function() {
            expect(cryptoUtil.encrypt("neo")).toBe("L0juzaGr4qMLf/oXscVcHw==");
        });
        it("encrypt a sentence", function() {
            expect(cryptoUtil.encrypt("some text")).toBe("bpcljkEtWiaXqRyOsR68BA==");
        });
        it("encrypt special chars", function() {
            expect(cryptoUtil.encrypt("some.text?")).toBe("T7b+PPiZVmAcUnAuybXZ4w==");
        });
        it("encrypt empty input", function() {
            expect(cryptoUtil.encrypt("")).toBe("");
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
            expect(cryptoUtil.decrypt("L0juzaGr4qMLf/oXscVcHw==")).toBe("neo");
        });
        it("decrypt a sentence", function() {
            expect(cryptoUtil.decrypt("bpcljkEtWiaXqRyOsR68BA==")).toBe("some text");
        });
        it("decrypt special chars", function() {
            expect(cryptoUtil.decrypt("T7b+PPiZVmAcUnAuybXZ4w==")).toBe("some.text?");
        });
        it("decrypt empty input", function() {
            expect(cryptoUtil.decrypt("")).toBe("");
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