import mongoose from 'mongoose'

// in this schema we will define all the properties of a product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true }
})

// creating model to store data if the model is already created then it will use that model using 1st statement else it will create a model named product with that schema
const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel