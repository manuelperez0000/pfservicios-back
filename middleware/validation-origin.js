const responseErrors = require('../helpers/response-errors');
const checkJwt = require('../helpers/checkJwt');
const User = require('../models/users.model');

// eslint-disable-next-line consistent-return
const validateOrigin = async(req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return responseErrors(res, 403, 'Unauthorized', {
            error: 'unauthorized',
            msg: 'Unauthorized Access',
        });
    }
    const token = await authorization.split(' ')[1];
    if (token == 'undefined' || !token) {
      
        return responseErrors(res, 401, 'Unauthorized', {
            error: 'unauthorized',
            msg: 'token required',
        });
    }
   
        const jwt = checkJwt(token);
        if (jwt.iat > jwt.epx) {
            return responseErrors(res, 401, 'Unauthorized', {
                error: 'unauthorized',
                msg: 'Token expired',
            })
        }
        const checkUser = await User.findOne({ email: jwt.email, active: true });
        if (!checkUser) {
            return responseErrors(res, 401, 'Unauthorized', {
                error: 'unauthorized',
                msg: 'User not found',
            });
        }
        console.log(checkUser.password,'password',jwt.pass);
    
        if (checkUser.email !== jwt.email || checkUser.password !== jwt.pass) {
            return responseErrors(res, 401, 'Unauthorized', { 
                error: 'unauthorized',
                msg: 'Invalid credentials',
            });
        }   

    
    next();
};

module.exports = { validateOrigin };