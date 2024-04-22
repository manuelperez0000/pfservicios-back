const nodemailer = require('nodemailer');
const config = require('../config.json');

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
    service: 'gmail',
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
    host: 'smtp.gmail.com',

});

module.exports = transporter