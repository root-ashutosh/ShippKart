import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

// gateway initialize - creating instance of stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// global variables
const currency = 'usd'
const deliveryCharge = 10


// placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        // saving orderdata on the database -placing order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // after placing the order successfully -- empty cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// placing orders using stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        // getting the origin Url as from where the user has initiated the payment
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        // saving orderdata on the database - placing order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // after placing the order we will create one line item using which we can execute the stripe payment
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // adding delivery charges
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge
            },
            quantity: 1
        })

        // creating a new session 
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,

            line_items,
            mode: 'payment',

        })
        // when a new session is created we get one Url using which we can redirect the user to the payment gateway
        res.json({ success: true, session_url: session.url })
 


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function to verify payment
const verifyStripe = async (req,res) => { 

    const {orderId, success , userId} = req.body
    try {
        if (success === 'true'){

            await orderModel.findByIdAndUpdate(orderId,{payment:true})

            await userModel.findByIdAndUpdate(userId,{cartData:{}}) // clear the cart after succesful payment

            res.json({success:true})

        }else{
            await orderModel.findByIdAndDelete(orderId) 
            res.json({success:false})
        }
            
        

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
  



// All orders data for Admin Panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// User order data for the frontend
const userOrders = async (req, res) => {
    try {
        // userId will be added by the middleware after authentication
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// Udate order status from the admin panel
const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export { placeOrder, placeOrderStripe, allOrders, updateStatus, userOrders,verifyStripe }
