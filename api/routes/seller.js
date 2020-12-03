require('dotenv').config();


const express = require('express');
const router = express.Router();
const sellerController = require('../controller/seller');
const validation = require('../middleware/validation').seller;
const auth  = require('../middleware/auth').authseller;
const cartController = require('../controller/cart')

//seller

router.post('/',sellerController.FindBestSeller)


router.post('/signup',validation.newseller , auth.encpassword, sellerController.AddUser); //dodati validaciju slike
router.get('/security/:token',auth.authenticateBlockToken) 


router.post('/login',auth.login,sellerController.login) //provjereno, mzda refresh table za sellera da se doda
router.post('/token',sellerController.refreshToken)
router.post('/logout', sellerController.logout)


router.put('/settings',auth.authenticateToken,validation.updateseller, auth.encpassword,sellerController.UpdateUser)

//router.post('/security/resetpassword',validation.password,auth.authenticateResetPasswordToken,auth.encpassword,sellerController.RessetPassword)
router.post('/security/password',sellerController.RessetPasswordRequest)

//router.get('/products/:marketingname',productController.FindProductsByMarketingName)
//router.get('/marketingproducts',productController.FindMarketingProducts)
module.exports = router;