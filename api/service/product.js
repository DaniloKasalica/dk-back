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
FindByInsertId: async(insertId)=>{
  try{
    const sql = `SELECT 
     ProductID as productid,
    ProductName as name,
    Sort as sort,
    Price as price,
    Quantity as quantity,
    Unit as unit,
    Image as image
    FROM Products 
     FROM Products
     WHERE ${insertId} = ProductID`
    const result = await Module.query(sql)
    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
FindBySellerID: async(id)=>{
  try{
    const sql = `SELECT 
     ProductID as productid,
     ProductName as name,
     Sort as sort,
     Price as price,
     Quantity as quantity,
     Unit as unit,
     Image as image
     FROM Products 
     WHERE SelerID = ${id} `;
    const result = await Module.query(sql);

    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
UpdateProductByProductID: async(doc,productid,sellerid)=>{
    try{
    let sql = `UPDATE Products
    SET `
    let comma = ''
   if(doc.name){
   sql+=comma+`ProductName = '${doc.name}'`
   comma = ','}
   if(doc.sort){
   sql+=comma+`Sort = '${doc.sort}'`
   comma = ','}
   if(doc.price){
   sql+=comma+`Price = '${doc.price}'`
   if(doc.image){
   sql+=comma+`Image = '${doc.image}'`
   comma = ','}
   if(doc.unit){
   sql+=comma+`Unit = '${doc.unit}'`
   comma = ','}
  sql+= ` WHERE SelerID = ${sellerid} AND ProductID = ${productid}`;
   const result  = await Module.query(sql);
   return Promise.resolve (result)
   }
 }catch(err){
   return Promise.rejecet(err)
 }
},
ChangeStatus: async(status,productid,sellerid)=>{
    try{
        let sql = `UPDATE Products
        SET IsDiscounted = ${status}
        WHERE ProductID = ${productid} AND SellerID =${sellerid}
        `
       const result  = await Module.query(sql);
       return Promise.resolve (result)
       }
     catch(err){
       return Promise.rejecet(err)
     }
}
}

module.exports = product;