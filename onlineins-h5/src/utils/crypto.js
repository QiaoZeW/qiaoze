const CryptoJS = require('crypto-js');
const secritKey = '1234567887654321'

function encrypt(word, keyStr = secritKey) {
    var rval = ""
    try {
        var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        rval = encrypted.toString();
    } catch (e) {
        console.log(e);
    }
    return rval;
}

function decrypt(word, keyStr = secritKey) {
    var rval = null;
    try {
        var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        rval = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
    } catch (e) {
        console.log(e);
    }
    return rval;
}

export {
    encrypt,
    decrypt
}
/*
  --------用法-----------------
  var mm = encrypt(1234567)
  console.log(mm);
  var jm = decrypt(mm);
  console.log(jm)
*/
