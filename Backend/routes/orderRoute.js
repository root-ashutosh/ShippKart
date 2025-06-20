import express from 'express'
import {placeOrder,placeOrderStripe,allOrders,updateStatus,userOrders, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// creating endpoints
// Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)



// User features - to display items ordered
orderRouter.post('/userorders',authUser,userOrders)  

// Verify Payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)


export default orderRouter