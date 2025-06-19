import mongoose from "mongoose";

// in this schema we will define all the properties of a user
// we have made unique true so that only 1 id could be formed with 1 email address
// cart data will store the data of the cart so for new user it will be an empty object 
// there is a porperty of mongoose that it ignores the property with empty object but here we want to create a cartdata for new user with an empty object so for that we have made minimize false
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false })

// if the model is already created then use it else create a new model 
const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel