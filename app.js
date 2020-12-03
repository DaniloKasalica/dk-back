const express = require('express');

const { json, urlencoded } = require('body-parser')

console.log(require('crypto').randomBytes(64).toString('hex'))

const cors = require('cors')





const userRoutes = require('./api/routes/user')
const sellerRoutes = require('./api/routes/seller')
const productsellerRoutes  = require('./api/routes/productseller')



const app = express()
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors())

app.use('/api/user',userRoutes);
app.use('/api/seller/products',productsellerRoutes)
app.use('/api/seller', sellerRoutes);

app.get('*',(req,res)=>{
    return handle(req,res)
})


const port = process.env.PORT || 3001;

app.listen(port)



