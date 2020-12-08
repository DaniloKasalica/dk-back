const productService = require('../service/product')
const tokenService = require('../service/token')
const productimagesservice = require('../service/productimages')
const sellerimagesservice = require('../service/sellerimages')
const sellerservice = require('../service/seller')

const product = {

    FindSellerProducts: async(req,res)=>{
      try{
         let seller = await sellerservice.FindBySellerID(req.params.id)
         let products = await productService.FindBySellerID(req.params.id)
        
          products =   await Promise.all(
                     products.map(async (elem)=>{
                      return {
                       ...elem,
                     productimages:await productimagesservice.findByProductID(elem.productid)
                     }
            
            })
         ) 
          seller = {
                       ...seller,
                     sellerimages:await sellerimagesservice.findBySellerID(req.params.id)
                     }
            
         console.log(products,'products')
         console.log(seller,'seller')
         res.status(200).send({products,seller})
      }catch(err){
         console.log(err)
         res.status(400).send({error:err.message})
      }
   }
 }
 module.exports = product;