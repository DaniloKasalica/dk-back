const Module = require('../model/model')


const product = {

    //seller
  InsertIntoTable: async (doc,id) =>{
try{
  const sql= `INSERT INTO Products (SellerID,ProductName,Sort,Price,IsDiscount,Quantity,Image)
   VALUES ?`
   const person = [[id,doc.name,doc.sort,doc.price,doc.isdiscounted,doc.qunatity,doc.image]];
   const result =  await Module.query(sql,[person])

  return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},
FindByCord: async(latitude)=>{
  try{
      
    const sql = `SELECT 
     Town as town
     FROM Towns
     ORDER BY ABS( Towns.Latitude - ${latitude} ) `
    const result = await Module.query(sql)

    return Promise.resolve(result[0])
  }catch(err){
    return Promise.reject(err)
  }
}
}

module.exports = product;