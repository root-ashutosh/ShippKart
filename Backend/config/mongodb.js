import mongoose from "mongoose";

const connectDB = async () => {

    // whenever mongodb connection will be established this will be executed 
    mongoose.connection.on('connected', ()=>{
        console.log('DB Connected');

    })
    await mongoose.connect(`${process.env.MONGODB_URI}/shippKart`)
}
export default connectDB


// Whenever we will execute this funtion our MongoDB database will be connected
