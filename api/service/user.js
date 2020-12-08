const Module = require('../model/model')


const user = {
  InsertIntoTable: async (doc) =>{
try{
  console.log(doc)
  const sql= `INSERT INTO Users (Username,Email,Number, Password)
   VALUES ?`
   const person = [[doc.username,doc.email,doc.number,doc.password]];
   const result =  await Module.query(sql,[person])

  return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},
FindByInsertId: async(insertId)=>{
  try{
    const sql = `SELECT * FROM Users WHERE ${insertId} = UserID`
    const result = await Module.query(sql)
    return Promise.resolve(result[0])
  }catch(err){
    return Promise.reject(err)
  }
},
FindByEmail: async(email)=>{
  try{
    const sql = `SELECT * FROM Users WHERE Email = '${email}'`;
    const result = await Module.query(sql);

    return Promise.resolve(result[0])
  }catch(err){
    return Promise.reject(err)
  }
},
FindByUsername: async(username)=>{
  try{
    const sql = `SELECT * FROM Users  WHERE Username = '${username}'`
    const result = await Module.query(sql);
    return Promise.resolve(result[0])
  }catch(err){
    return Promise.resolve(err)
  }
},
UpdatePasswordByID: async(password,id)=>{
  try{
    let sql = `UPDATE Users
     SET password = '${password}'
     WHERE UserID = ${id}`
     await Module.query(sql);
     Promise.resolve(true)
  }catch(err){
    return Promise.rejecet(err)
  }
},
UpdateByID: async(id,doc)=>{
  try{
    let sql = `UPDATE Users
     SET `
     let comma = ''
    if(doc.username){
    sql+=comma+`username = '${doc.username}'`
    comma = ','}
    if(doc.firstname){
    sql+=comma+`FirstName = '${doc.firstname}'`
    comma = ','}
    if(doc.lastname){
    sql+=comma+`lastname = '${doc.lastname}'`
    comma = ','}
    if(doc.password){
    sql+=comma+`password = '${doc.password}'`
    comma = ','}
    if(doc.email){
    sql+=comma+`email = '${doc.email}'`
    comma = ','}
   sql+= ` WHERE UserID = ${id}`;
    const result  = await Module.query(sql);
    return Promise.resolve (result)
  }catch(err){
    return Promise.rejecet(err)
  }
},
UpdateActiveStatus: async(ID,val)=>{
  try{
  const sql = `UPDATE users SET IsActive = ${val} WHERE UserID = ${ID }`
  const result = await Module.query(sql)
  if(result.affectedRows===0)
  throw new Error('can not find admin username')
  return Promise.resolve(true)
  }catch(err){
    return Promise.reject(err)
     }
}
}

module.exports = user;