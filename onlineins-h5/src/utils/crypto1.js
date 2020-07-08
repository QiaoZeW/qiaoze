const CryptoJS = require('crypto-js')
const privateKey = 'aeonlife@WSX#$%&'


function encrypt (word, keyStr = privateKey) {
    var rval = ""
    try {
        var hash = CryptoJS.HmacSHA256(word, keyStr);
        rval = CryptoJS.enc.Hex.stringify(hash);
    } catch (e) {
        console.log(e);
    }
    return rval;
}

export {
    encrypt
}

