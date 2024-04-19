const bcrypt = require('bcrypt');


const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

function hashCompare(pass = 'secret',hash='') {
    const test = bcrypt.compareSync(pass, hash);
    return test;
}

/**
 * Generates a hash of the given text using bcrypt.
 *
 * @param {string} [text='secret'] - The text to be hashed. Defaults to 'secret'.
 * @return {string} The hashed text.
 */
function createHash (pass = 'secret') {
   const hash = bcrypt.hashSync(pass, saltRounds);
   return hash;
}
module.exports = {
    hashCompare,
    createHash
};