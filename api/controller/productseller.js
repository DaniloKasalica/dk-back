const productService = require('../service/product')
const tokenService = require('../service/token')
const product = {
   AddNewProd: async(req,res)=>{
        try{
         const result = await productService.InsertIntoTable(req.body,req.params.id)  
         res.sendStatus(200)
        }catch(err){
         res.status(400).send({error: err.message})
        }
    },
    UpdateProduct: async(req,res) =>{
       try{
          const result = await productService.UpdateProductByProductID(req.body,req.params.productid,req.params.id)
          res.status(200).send(products)
          
       }catch(err){
          res.status(400).send({error:err.message})
       }
    },
   RemoveProduct: async(req,res)=>{
      try{
         const products = await productService.ChangeStatus(req.body.status,req.params.productid,req.params.id)
         res.sendStatus(201)
      }catch(err){
         res.status(400).send({error:err.message})
      }
   }
 }
 module.exports = product;