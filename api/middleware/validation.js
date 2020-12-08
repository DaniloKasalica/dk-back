const userService = require('../service/user')
const bcrypt = require('bcryptjs');
const user = {
     newuser : async (req,res,next) =>{
        Promise.all([
            passval(req.body.password,false),
            usernameval(req.body.username),
            emailval(req.body.email)

        ]).then(()=>{
            next();
        }).catch((err)=>{
            res.status(400).send({error: err.message})
        })
    },
    password: async(req,res,next)=>{
        try{
        await passval(req.body.password)
        next()
        }catch(err){
            res.status(400).send({error:err.message})
        }
    },
    updateuser: async(req,res,next) =>{
        try{
            if(req.body.password && req.body.oldpassword){
         const user = await userService.FindByInsertId(req.params.id)
         const resp = await bcrypt.compare(req.body.oldpassword, user.Password);
         if(resp){
         await passval(req.body.password)
         console.log(resp)
         }
         else{
             throw new Error('incorect password')
         }
        }
    
        if(req.body.username){
        await usernameval(req.body.username)
        }
        if(req.body.email)
        await emailval(req.body.email)
        next()
        }catch(err){
           return res.status(400).send({error:err.message})
        }
    }
}



const seller =  {
    newseller : async (req,res,next) =>{
       Promise.all([
           passval(req.body.password,true),
           emailval(req.body.email)

       ]).then(()=>{
           next();
       }).catch((err)=>{
           res.status(400).send({error: err.message})
       })
   },
   password: async(req,res,next)=>{
       try{
       await passval(req.body.password)
       next()
       }catch(err){
           res.status(400).send({error:err.message})
       }
   },
   updateseller: async(req,res,next) =>{
       try{
           if(req.body.password && req.body.oldpassword){
        const user = await userService.FindByInsertId(req.params.id)
        const resp = await bcrypt.compare(req.body.oldpassword, user.Password);
        if(resp){
        await passval(req.body.password)
        console.log(resp)
        }
        else{
            throw new Error('incorect password')
        }
       }
   
       if(req.body.username){
       await usernameval(req.body.username)
       }
       if(req.body.email)
       await emailval(req.body.email)
       next()
       }catch(err){
          return res.status(400).send({error:err.message})
       }
   }
}
const emailval = async (email)=>{
    if(email == undefined)
    return Promise.reject(new Error('email is required'))
    const result = await userService.FindByEmail(email)
    if(result)
    return Promise.reject(new Error('email exist'))
    return Promise.resolve(true)
}
const usernameval = async(username)=>{
    if(username == undefined)
    return Promise.reject(new Error('username is required'))
    const result = await userService.FindByUsername(username)
    if(result)
    return Promise.reject(new Error('username exist'))
    return Promise.resolve(true)
}
const firstnameval = (firstname)=>{
    if(firstname == undefined)
    return Promise.reject(new Error('firstname is required'))
    return Promise.resolve(true)
}
const lastnameval = (lastname)=>{
    if(lastname == undefined)
    return Promise.reject(new Error('lastname is required'))
    return Promise.resolve(true)
}

const passval = (password,role)=>{
    if(password == undefined ||password.length<8)
    return Promise.reject(new Error('short password'))
    if(role){
    if(includenum(password)===null || letter(password)===null)
    return Promise.reject(new Error('Pass val fail'))
    return Promise.resolve(true)
    }
}
const includenum = (password)=>{
    const res =  /\d/.test(password);
    if(res==true)
    return res;
    return null;
 }
 const letter = (password)=>{
         for(let i = 0; i<password.length; i++){
             if( (password.charAt(i).toLowerCase()!=password.charAt(i).toUpperCase())&& password.charAt(i)==password.charAt(i).toUpperCase()){
             for(let i = 0; i<password.length; i++){
                 if( (password.charAt(i).toLowerCase()!=password.charAt(i).toUpperCase())&&password.charAt(i)==password.charAt(i).toLowerCase()){
             return true
                 }
             }
             return null
         }
         }
         return null
     }
 module.exports = {
     user,
     seller
 };