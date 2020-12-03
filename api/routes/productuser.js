

const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authuser;
const productController = require('../controller/productuser')

//products/
router.get('/marketing',productController.FindMarketingProducts)
router.get('/packets',productController.FindPackets)
router.get('/',productController.FindProducts)
//router.get('/:marketingID',productController.FindProductsByMarketingID)
//router.get('/:PacketName', productController.FindProductsByPacketName )
router.get('/:PacketID', productController.FindProductsByPacketID)

module.exports = router