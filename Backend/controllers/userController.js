import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// funtion for creating token for new user
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}



// function to handle user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })
        if (!user) { // check if user does not exists
            return res.json({ success: false, message: "No User Found" })
        }
        // now if the user exists check that the password entered is correct or not  
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) { // if the password matches
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Password" })
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


// function to handle user register
const registerUser = async (req, res) => {
    try {
        // if a user makes a request at this endpoint with this data then destructuring the data for further processes
        const { name, email, password } = req.body;

        // checking user already exists or not 
        const exists = await userModel.findOne({ email })
        if (exists) { // if the user already has an account with the same email address then exists will have some data else it will be undefined so it will not enter here and carry on 
            return res.json({ success: false, message: "User already exists" })
        }
        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        // hasing user password 
        const salt = await bcrypt.genSalt(10) // we can provide a no. from 5 to 15 longer takes more time
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        // saving new user in database
        const user = await newUser.save()

        // now we will provide one token using that user can login in the application
        const token = createToken(user._id)
        res.json({ success: true, token })


        // now if there is any error in above process this catch block will be executed
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}
// function to handle admin login 
const adminLogin = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Wrong Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { loginUser, registerUser, adminLogin }