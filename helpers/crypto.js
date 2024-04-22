const crypto = require('crypto');


const algorithm = 'aes-256-cbc';
const key = Buffer.alloc(32,process.env.SECRET_CODE || 'claveSecreta');
const iv = Buffer.alloc(16,process.env.SECRET_CODE || 'claveSecreta' );

function createCrypto(text = 'secret') {

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function decryptoPass(text = 'secret') {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function compareCrypto( pass, encrypted ){
    return createCrypto(pass) === encrypted ? true : false;
}

module.exports = {
    createCrypto,
    decryptoPass,
    compareCrypto
}