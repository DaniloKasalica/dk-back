const Module = require('../model/model')


const sellerimages = {

    //seller
findBySellerID: async(id)=>{
  try{
    const sql = `SELECT Main as main, ImageID as imageid,Url as url
     FROM Sellerimages 
     WHERE SellerID = ${id} `;
    const result = await Module.query(sql);

    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
}
}

module.exports = sellerimages;