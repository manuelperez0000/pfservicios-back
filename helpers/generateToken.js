const jwt = require("jsonwebtoken");


/**
 * Generates a JSON Web Token (JWT) based on the provided user object.
 *
 * @param {Object} user - The user object containing the email and new password.
 * @return {string} The generated JWT.
 */
const generateToken = (user) => {
    const payload = {
        email: user.email,
        pass: user.newpasswor
    };
    const secretCode = process.env.SECRET_CODE || "claveSecreta";
    
    const token = jwt.sign(payload, secretCode, { expiresIn: "7d" }); // Expira en 7 dias
    return token;
};

module.exports = generateToken;