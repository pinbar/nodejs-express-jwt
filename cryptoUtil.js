var crypto = require('crypto');
var config = require('./config');

var algorithm = config.cryptoAlgorithm;
var passPhrase = config.cryptoPassphrase;

module.exports = {

    encrypt: function encrypt(claim) {
        var cipher = crypto.createCipher(algorithm, passPhrase);
        var crypted = cipher.update(claim,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function decrypt(claim) {
        var decipher = crypto.createDecipher(algorithm, passPhrase);
        console.log(claim);
        var decrypted = decipher.update(claim,'hex','utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}