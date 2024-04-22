const JWT = require('jsonwebtoken');


/**
 * Generates a JSON Web Token (JWT) based on the provided user object.
 *
 * @param {Object} user - The user object containing the user and pass properties.
 * @param {string} user.user - The user's username.
 * @param {string} user.pass - The user's password.
 * @return {string} The generated JWT.
 */
const setJWT = ( user = {user,pass}) => {

    const secretCode = process.env.SECRET_CODE || 'claveSecreta';
    const token = JWT.sign(user, secretCode, { expiresIn: '100d' });
    return token;
};

module.exports = setJWT;