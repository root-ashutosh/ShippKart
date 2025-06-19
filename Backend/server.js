import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config
const app = express()
//if port no. is available in env then get that port no. else we'll use 4000
const port = process.env.PORT || 4000

//connecting to our database
connectDB()
// connecting to cloud
connectCloudinary()

// middlewares
app.use(express.json()) // after using this whatever request we will get that will be parsed using json
app.use(cors())

// Api endpoints
app.use('/api/user',userRouter) //registering userRouter with the base path-- so all the routes in this router now have a prefixed (/api/user) path
//same for product
app.use('/api/product',productRouter)
// for cart
app.use('/api/cart',cartRouter)
// for orders
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('API working') 
})

// Starting the express server
app.listen(port,()=> console.log('Server started on PORT :'+port))