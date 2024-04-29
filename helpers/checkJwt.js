const JWT = require('jsonwebtoken');

/**
 * Verifies a JSON Web Token (JWT) using the provided secret code or a default secret code.
 *
 * @param {string} token - The JWT to be verified.
 * @return {Object} The decoded payload of the JWT.
 */
function checkJwt(token) {
    const secretCode = process.env.SECRET_CODE || 'claveSecreta';
   
    const decoded = JWT.verify(token, secretCode, function (err, decoded) {
        if (err) {
            return err;
        }
        return decoded;
    });
    return decoded;
}

module.exports = checkJwt