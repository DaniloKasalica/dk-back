const Module = require('../model/model')
const product = require('./product')


const cart = {
  AddNewCart: async (userID) =>{
try{
  const sql= `INSERT INTO Cart (UserID)
  VALUES (${userID})`
   const result =  await Module.query(sql)
   return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
  },
  FindUserCartsByCart: async(cartID)=>{
    try{
       const sql1 = `SELECT  Products.ProductID as productid,
        ProductName as productname, Price_1 as price1, Price_2 as price2, Price_3 as price3,
       Description_price as pricedescription, Description_1 as description1, Value_1 as value1, PricePacket as pricepacket, CartID as cartid,
       CardProducID as cartproductid
       FROM products
       JOIN cart_products ON cart_products.ProductID = products.productID
       WHERE cart_products.CartID =${cartID}`
       console.log(sql1)
       const products = await Module.query(sql1)
       return Promise.resolve(products)
       }catch(err){
         return Promise.reject(err)
       }
  },
  RemoveCart_productByID:async (ProductID,CartID)=>{
    try{
      const sql = `DELETE FROM Cart_products
      WHERE ProductID =${ProductID} AND CartID = ${CartID}`
       const result = await Module.query(sql)
       console.log(result)
       if(result.affectedRows === 0){
       throw new Error('can not find product')
       }
       return Promise.resolve(true)
       }catch(err){
         return Promise.reject(err)
       }
  },
  RemoveAllCart_productsByCartID: async(CartID)=>{
    try{
      const sql = `DELETE FROM Cart_products
      WHERE CartID =${CartID}`
       const result = await Module.query(sql)
       return Promise.resolve(true)
       }catch(err){
         return Promise.reject(err)
       }

  },
 
  CheckIfProductExist:  async(userID, productID)=>{
    try{
      const sql = `SELECT *
      FROM cart_products
      WHERE cart_products.CartID =${cartID} AND cart_products.ProductID = ${productID}` 
       const result = await Module.query(sql)
       if(result[0]!==undefined)
       throw new Error('Produkt vec postoji u korpi')
       return Promise.resolve(result[0])
       }catch(err){
         return Promise.reject(err)
       }
  },
  FindCartProductsByCartID: async(cartID)=>{
    try{
      const sql = `SELECT  Products.ProductID as productid,
       ProductName as productname,
       Products.Price as price,
       Products.Quantity as quantity,
       Unit as unit,
        CartId as cartid,
       CartProductID as cartproductid
       FROM products
       JOIN cart_products
       ON cart_products.ProductID = products.productID
       WHERE cart_products.CartID =${cartID}`
       const result = await Module.query(sql)
       return Promise.resolve(result)
       }catch(err){
         return Promise.reject(err)
       }
   
     },
     DeleteCart:async(cartID)=>{
      try{
        const sql = `DELETE FROM Cart_products
         WHERE CartID= ${cartID}`
         const sql2 = `DELETE FROM Cart WHERE CartID = ${cartID}`
         await Module.query(sql)
         await Module.query(sql2)
         return Promise.resolve(true)
         }catch(err){
           return Promise.reject(err)
         }
     
       },
  SelectCarts: async(orderID)=>{
    try{
    sql = `SELECT CartID, UserID, OrderTime,Pricepacket,email,ProductName,price_1,price_2,price_3
    FROM orders_view
    JOIN products ON orders_view.ProductID = products.ProductID
    WHERE OrderID = ${orderID}`
    const result = await Module.query(sql)
    return Promise.resolve(result)
    }catch(err){
      return Promise.reject(err)
    }

  },
  FindNumberOfProductsByCartID: async(cartID)=>{
    try{
      sql = `SELECT count(CartProductID)  as number
      FROM cart_products
      WHERE Cart_products.CartID = ${cartID}`
      const result = await Module.query(sql)
      return Promise.resolve(result[0])
      }catch(err){
        return Promise.reject(err)
      }
  },
  FindCartIDByUserID: async(userID)=>{
    try{
      sql = `SELECT CartID as cartid
      FROM Cart
      WHERE Cart.UserID = ${userID}`
      const result = await Module.query(sql)
      return Promise.resolve(result[0])
      }catch(err){
        return Promise.reject(err)
      }
  },
   AddNewCartProduct: async(cartID, productID)=>{
     try{
       const sql = `
       INSERT INTO cart_products(
       CartID,
       ProductID
       ) VALUES ?`
       const result = await Module.query(sql,[[[cartID,productID]]])
       return Promise.resolve(result)
     }catch(err){
       return Promise.reject(err)
     }
   }
}
module.exports = cart;