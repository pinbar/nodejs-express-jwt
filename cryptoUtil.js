var crypto = require("crypto");
var config = require("./config");

var algorithm = config.cryptoAlgorithm;
var passPhrase = config.cryptoPassphrase;

module.exports = {

    encrypt: function encrypt(text) {
        if(text){
            var cipher = crypto.createCipher(algorithm, passPhrase);
            var crypted = cipher.update(text.trim(),"utf8","base64");
            crypted += cipher.final("base64");
            return crypted;
        } else {
            return "";
        }
    },

    decrypt: function decrypt(text) {
        if(text){
            var decipher = crypto.createDecipher(algorithm, passPhrase);
            console.log(text);
            var decrypted = decipher.update(text.trim(),"base64","utf8");
            decrypted += decipher.final("utf8");
            return decrypted;
        } else {
            return "";
        }
    }
}