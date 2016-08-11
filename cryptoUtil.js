var crypto = require('crypto');
var config = require('./config');

var algorithm = config.cryptoAlgorithm;
var passPhrase = config.cryptoPassphrase;

module.exports = {

    encrypt: function encrypt(text) {
        var cipher = crypto.createCipher(algorithm, passPhrase);
        var crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function decrypt(text) {
        var decipher = crypto.createDecipher(algorithm, passPhrase);
        console.log(text);
        var decrypted = decipher.update(text,'hex','utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}