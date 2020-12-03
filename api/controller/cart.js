
const cartService = require('../service/cart')
const cart = {
    AddNewCart : async(req,res,next)=>{
        try{
      await  cartService.AddNewCart(req.params.id)
     next()
        }catch(err){
           return res.sendStatus(400)
        }
        
    },
    GetProdNumInCart: async(req,res)=>{
      try{
         const CartID  = (await cartService.FindCartIDByUserID(req.params.id)).cartid
      const result  =   (await cartService.FindNumberOfProductsByCartID(CartID)).number
         res.send({number: result})
      }
      catch(err){
         res.sendStatus(400)
      }
   },
    RemoveFromCart: async(req,res)=>{
       try{
         const CartID  = (await cartService.FindCartIDByUserID(req.params.id)).cartid
         await cartService.RemoveCart_productByID(req.params.ProductID,CartID)
          res.sendStatus(200)
       }
       catch(err){
          res.sendStatus(400)
       }
    },
    UpdateCart: async(req,res)=>{
      try{
         const CartID = (await cartService.FindCartIDByUserID(req.params.id)).cartid
        const result =  await cartService.CheckIfProductExist(CartID,req.body.productid)
       // await Promise.all(
           // req.body.products.map(async (elem) => {
              await cartService.AddNewCartProduct(CartID,req.body.productid)
        //  }));
          res.sendStatus(200)
            }catch(err){
               return res.status(400).send({error:err.message})
            }
              
    },
    FindUserCarts: async(req,res,next)=>{
      try{
         const CartID = (await cartService.FindCartIDByUserID(req.params.id)).cartid
   const result = await  cartService.FindCartProductsByCartID(CartID)
   res.status(200).send({carts: result})
      }catch(err){
         console.log(err)
         return res.sendStatus(400)
      }
      
  }
}
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = cart;