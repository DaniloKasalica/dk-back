
const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authseller;
const productController = require('../controller/productseller')

//seller/products


router.post('/newprod',auth.authenticateToken,productController.AddNewProd) //dodati validaciju i slike!
router.put('/updateprod/:productid',auth.authenticateToken,productController.UpdateProduct)
router.get('/:id',productController.FindSellerProducts)
router.delete('/:productid',auth.authenticateToken,productController.RemoveProduct)
//router.post('/newmarketingprod/:PacketID',/*auth.authadmin.authenticateToken,*/productController.AddNewProdMarketing)



module.exports = router