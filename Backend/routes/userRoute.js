import express from "express";
import { loginUser,adminLogin,registerUser } from "../controllers/userController.js";

const userRouter = express.Router()

// whenever there will be a post request at this endpoint, it will call these funtion to handle it
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter 