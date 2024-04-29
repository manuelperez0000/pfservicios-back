require('dotenv').config()
const axios = require('axios');
const  config  = require('../config');


const clientId = process.env.CLIENT_PAYPAL_ID;
const secret = process.env.CLIENT_PAYPAL_SECRET;
const paypalDevUrl = config.paypalUrl || 'https://api-m.sandbox.paypal.com';

class PaypalController {
    
    
    async getAccessToken(req, res) {
     try {
        /* console.log(clientId);
        console.log(secret); */
        const url = `${paypalDevUrl}/v1/oauth2/token`;
        
        const response = await axios({
            method: 'post',
            url,
            auth: {
                username: clientId,
                password: secret
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                'grant_type': 'client_credentials'
            }
        });
       console.log(response.data);
        return res.status(200).json(response.data);
     } catch (error) {
        return res.status(400).json({error});
     }
    }


}

module.exports = PaypalController