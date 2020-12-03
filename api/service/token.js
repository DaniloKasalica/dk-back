const Module = require('../model/model')


const token = {
  InsertIntoTable: async (token) =>{
try{
   const sql= `INSERT INTO Token (TOKEN)
   VALUES ?`
   const refrestoken = [[token]];
   const result =  await Module.query(sql,[refrestoken])

  return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},
FindToken: async (token) =>{
try{
 const sql= `SELECT * FROM Token WHERE TOKEN = '${token}'`
 const result =  await Module.query(sql)
 if (result.length === 0)
 throw new Error ('Invalid refresh token')
 return Promise.resolve(result)
 }catch(err){
   return Promise.reject(err)
 }
},
DeleteToken: async(token)=>{
    try{
        const sql = `DELETE  FROM Token WHERE TOKEN = '${token}'`
        const result = await Module.query(sql)
        if(result.affectedRows == 0)
        throw new Error('Invalid refresh token')
        return Promise.resolve(result);
    }catch(err){
        return Promise.reject(err)
    }
}


}
module.exports = token;