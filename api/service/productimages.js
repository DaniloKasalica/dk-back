const Module = require('../model/model')


const productimages = {

    //seller
findByProductID: async(id)=>{
  try{
    const sql = `SELECT Main as main, ImageID as imageid,Url as url
     FROM Productimages 
     WHERE ProductID = ${id} `;
    const result = await Module.query(sql);

    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
}
}

module.exports = productimages;