import mongoose from 'mongoose'

// in this schema we will define all the properties of a order
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default:'Order Placed'},
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true,default: false },
    date: { type: Number, required: true },

})
// creating model to store data in the database
//  if the model is already created then it will use that model using 1st statement else it will create a model named order with that schema
const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)

export default orderModel