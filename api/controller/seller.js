
const sellerService = require('../service/seller')
const tokenService = require('../service/token')
const townService = require('../service/town')
const sellerimagesservice = require('../service/sellerimages')
const productimagesservice = require('../service/productimages')
const jwt = require('jsonwebtoken')
const seller = {
    AddUser: async(req,res,next)=>{
       
       try{
      const person = await sellerService.InsertIntoTable(req.body);
      blockToken = jwt.sign({id:person.insertId},process.env.BLOCK_TOKEN, { expiresIn: '1d' });
      req.body.url = `http://localhost:3001/user/security/${blockToken}`
      req.params.id = person.insertId
      res.send({ID: person.insertId})
      next();
       }catch(err){
         res.status(400).send({error: err.message});
       }
    },
    login: async(req,res)=>{
      try{
      const accesToken = jwt.sign({id:req.body.id},process.env.ACCESS_TOKEN_SELLER, { expiresIn: '10m' });
      const refreshToken =  jwt.sign({id:req.body.id},process.env.REFRESH_TOKEN_SELLER)
      const result = await tokenService.InsertIntoTable(refreshToken)
      res.send({
        accesToken:accesToken,
        refreshToken: refreshToken
        })
      }catch(err){
        res.status(400).send({error:err.message})
      }
    },
    logout: async(req,res)=>{
      try{
      const refreshToken = req.body.token;
      if(refreshToken==null) 
      return res.sendStatus(400)
     const result = await tokenService.DeleteToken(refreshToken)
     res.status(200).send('Loged out ')
      }catch(err){
        res.status(400).send({error:err.message})
      }
    },
    refreshToken: async(req,res)=>{
      try{
      const refresToken = req.body.token
      if(refresToken==null) 
      return res.sendStatus(401)
      const result = await tokenService.FindToken(refresToken)
      jwt.verify(refresToken, process.env.REFRESH_TOKEN_SELLER, (err, user) => {
        if (err) 
        return res.sendStatus(403)
       const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SELLER, { expiresIn: '20m' })
        res.json({ accessToken: accessToken })
      })
    }catch(err){
      res.status(400).send({error:err.message})
    }
    },
     FindBestSeller: async(req,res)=>{
        try{
          let town ={}
          let result1 ={}
          let result ={}
          if(req.body.latitude && req.body.location==undefined){
           town = await  townService.FindByCord(req.body.latitude)
           result1 = await sellerService.FindBySelingProduct(req.body.type,req.body.sort,req.body.location,town.town)

          }else{
           town = undefined 
          result1 = await sellerService.FindBySelingProduct(req.body.type,req.body.sort,req.body.location,town)

          }
          
          result =   await Promise.all(
            result1.map(async (elem)=>{
               return {
                ...elem,
              sellerimages: await sellerimagesservice.findBySellerID(elem.id),
              productimages:await productimagesservice.findByProductID(elem.productid)
              }
            })
          )
          res.send({"proizvodjaci": result})
          }catch(err){
          res.status(400).send({error:err.message})
        }
      },

    UpdateUser: async(req,res)=>{
      try{
        const result = await sellerService.UpdateByID(req.params.id,req.body)
        res.sendStatus(201)
      }catch(err){
        console.log(err)
        res.status(400).send({error:err.message})
      }
    },
    RessetPasswordRequest: async(req,res,next)=>{
      try{
      const result = await sellerService.FindByEmail(req.body.email)
      token=  jwt.sign({id:result.UserID},process.env.REFRESH_TOKEN_SELLER , { expiresIn: '20m' })
      await tokenService.InsertIntoTable(token)
      req.body.url = `http://localhost:3000/security/resetpassword/${token}`
      next()
      }catch(err){
        res.sendStatus(400)
      }
    },
    RessetPassword: async(req,res)=>{
      try{
        await sellerService.UpdatePasswordByID(req.body.password,req.params.id)
        const accesToken = jwt.sign({id:req.body.id},process.env.ACCESS_TOKEN_SELLER, { expiresIn: '10m' });
        const refreshToken =  jwt.sign({id:req.body.id},process.env.REFRESH_TOKEN_SELLER)
         await tokenService.InsertIntoTable(refreshToken)
        res.send({
          accesToken:accesToken,
          refreshToken: refreshToken
          })
        }catch(err){
          res.status(400).send({error:err.message})
        }
      }
    }
module.exports = seller;