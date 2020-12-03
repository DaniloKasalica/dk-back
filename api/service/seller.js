const Module = require('../model/model')


const seller = {
  InsertIntoTable: async (doc) => {
    try {
      const sql = `INSERT INTO Seller (Name,Number,Email,Image,Packet,Password,Description)
   VALUES ?`
      const person = [
        [doc.name, doc.number, doc.email, doc.image, doc.Packet, doc.password, doc.description]
      ];
      const result = await Module.query(sql, [person])

      return Promise.resolve(result)
    } catch (err) {
      return Promise.reject(err)
    }
  },
  FindByInsertId: async (insertId) => {
    try {
      const sql = `SELECT * FROM Seller WHERE ${insertId} = SellerID`
      const result = await Module.query(sql)
      return Promise.resolve(result[0])
    } catch (err) {
      return Promise.reject(err)
    }
  },
  FindByEmail: async (email) => {
    try {
      const sql = `SELECT * FROM Seller WHERE Email = '${email}'`;
      const result = await Module.query(sql);

      return Promise.resolve(result[0])
    } catch (err) {
      return Promise.reject(err)
    }
  },
  FindBySelingProduct: async (type, sort, location, town) => {
    try {
      let sql = `SELECT 
        Seller.SellerID as id, Name as name,
        Number as number,Email as email,
        Description as description,
        Seller.Image as image,Unit as unit,
         Price as price, Quantity as quantity,
         Products.Image as ProductImage,     
         Shippingdetail.Town as town,   
         Shippingdetail.Time as shippingtime,
         Sorts.Type as type
         FROM Seller

         JOIN 
         Products ON Products.SellerID = Seller.SellerID

         JOIN 
         Shippingdetail ON Shippingdetail.ProductID = Products.ProductID

         JOIN Sorts ON Sorts.Sort = Products.Sort 
         WHERE 
         IsActive = true 
         `

      if (sort == undefined) {
        if (type) {
          sql += `AND Sorts.Type = '${type}' `
        }
      } else {
        sql += `AND Sorts.Sort = '${sort}' `
        if (type) {
          sql += `AND Sorts.Type = '${type}' `
        }
      }
      if (location) {
        sql += `AND town = '${location}' `
      } else if (town) {

        sql += `AND town = '${town}' `
      }
      sql += 'GROUP BY id'
      console.log(sql)
      const result = await Module.query(sql);

      return Promise.resolve(result)
    } catch (err) {
      return Promise.reject(err)
    }
  },






  UpdatePasswordByID: async (password, id) => {
    try {
      let sql = `UPDATE Seller
     SET password = '${password}'
     WHERE UserID = ${id}`
      await Module.query(sql);
      Promise.resolve(true)
    } catch (err) {
      return Promise.rejecet(err)
    }
  },
  UpdateByID: async (id, doc) => {
    try {
      let sql = `UPDATE Seller
     SET `
      let comma = ''
      if (doc.username) {
        sql += comma + `username = '${doc.username}'`
        comma = ','
      }
      if (doc.firstname) {
        sql += comma + `FirstName = '${doc.firstname}'`
        comma = ','
      }
      if (doc.lastname) {
        sql += comma + `lastname = '${doc.lastname}'`
        comma = ','
      }
      if (doc.password) {
        sql += comma + `password = '${doc.password}'`
        comma = ','
      }
      if (doc.email) {
        sql += comma + `email = '${doc.email}'`
        comma = ','
      }
      sql += ` WHERE UserID = ${id}`;
      const result = await Module.query(sql);
      return Promise.resolve(result)
    } catch (err) {
      return Promise.rejecet(err)
    }
  },
  UpdateActiveStatus: async (ID, val) => {
    try {
      const sql = `UPDATE Seller SET IsActive = ${val} WHERE UserID = ${ID }`
      const result = await Module.query(sql)
      if (result.affectedRows === 0)
        throw new Error('can not find admin username')
      return Promise.resolve(true)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

module.exports = seller;