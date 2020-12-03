require('dotenv').config();


const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation').user;
const auth  = require('../middleware/auth').authuser;
const cartController = require('../controller/cart')

//user
router.post('/signup',validation.newuser , auth.encpassword, userController.AddUser,cartController.AddNewCart);
router.get('/security/:token',auth.authenticateBlockToken) 

router.post('/login',auth.login,userController.login)
router.post('/token',userController.refreshToken)
router.post('/logout', userController.logout)

router.put('/settings',auth.authenticateToken,validation.updateuser, auth.encpassword,userController.UpdateUser)

router.post('/security/resetpassword',validation.password,auth.authenticateResetPasswordToken,auth.encpassword,userController.RessetPassword)
router.post('/security/password',userController.RessetPasswordRequest)

//router.get('/products/:marketingname',productController.FindProductsByMarketingName)
//router.get('/marketingproducts',productController.FindMarketingProducts)
module.exports = router;