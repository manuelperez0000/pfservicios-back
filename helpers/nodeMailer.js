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


    host: "smtp.office365.com",
    port: 587,
    secure: false, // STARTTLS
    tls: {
        rejectUnauthorized: false
    },
    requireTLS: false,
    auth: {
        user: 'pfservicios28042024@hotmail.com',
        pass: 'P7sErvicios28042024'
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
    debug: true,
    logger: true,
    host: 'smtp.gmail.com', */

});


module.exports = transporter