const nodemailer = require('nodemailer');
const config = require('../config.js');

const {  
email,
password,
clientId,
clientSecret,
refreshToken,
accessToken,
scope,
expires } = config.auth;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    tls: {
        rejectUnauthorized: false
    },
    secure: true,
    auth: {
        user: email,
        pass: password
    }
 /*    service: 'gmail',
    auth: {
        user: email,
        pass: password,
        type: 'OAuth2',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
        scope: scope,
        expires: expires
    },
    secure: true,
    port: 465,
    tls: {
        rejectUnauthorized: false
    },
    requireTLS: false,
    */

});


module.exports = transporter