

const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authuser;
const productController = require('../controller/userproducts');

//products/

router.get('/:id',productController.FindSellerProducts,)

module.exports = router 