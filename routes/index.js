const express = require('express');
const { check } = require('express-validator');
const { validateFields, checkUser } = require('../middleware/validation-fields');
const { validateOrigin } = require('../middleware/validation-origin');
const UserController = require('../controllers/user.controller');
const cors = require('cors');
const router = express.Router();


const userController = new UserController;



const routes = (app) => {
   app.use(cors())
   app.use('/api', router)

router.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to my API'})
})
router.get('/test', (req, res) => {
    res.status(200).json({message: 'Welcome from test route'})
})

/**
 * User routes
 */

// Create user
router.post('/user/create',[
    check('username', 'Nombre obligatorio').not().isEmpty(),
    check('email', 'Correo obligatorio').not().isEmpty(),
    checkUser,
    check('indentification', 'Identificación obligatorio').not().isEmpty(),
    check('newpassword', 'Contraseña obligatoria').not().isEmpty(),
    check('phone', 'Teléfono obligatorio').not().isEmpty(),
    check('email', 'Formato de correo invalido').isEmail(),
    check('phone', 'Formato de telefono invalido').matches(/^((\+)?(\d{1,3})[- ]?)?(\d{3}[- ]?){2}\d{3}$/),
    validateFields,
],userController.createUser)


// Login user
router.post('/user/login',[
    check('email', 'Correo obligatorio').not().isEmpty(),
    check('newpassword', 'Contraseña obligatoria').not().isEmpty(),
    check('email', 'Formato de correo invalido').isEmail(),
    validateFields
],userController.loginUser)


// Get users
router.get('/user/getusers',[
    validateOrigin,    
],userController.getUsers)


// Get user by email
router.post('/user/getuserbyemail',[
    validateOrigin,
],userController.getUserByEmail)


// get user by token
router.post('/user/getuserbytoken',[
    validateOrigin,
],userController.getUserByToken)


// Update user
router.put('/user/update',[
    validateOrigin,
    validateFields
],userController.updateUser)


// Delete user
router.put('/user/delete',[
    validateOrigin,
    check('token', 'Token obligatorio').not().isEmpty(),
    check('email', 'Formato de correo invalido').isEmail(),
    validateFields
],userController.deleteUser);


// send email
router.post('/user/forgotpassword',[
    check('email', 'Formato de correo invalido').isEmail(), 
    validateFields
],userController.forgotPassword)
}

/**
 * transaction routes
 */


module.exports = routes