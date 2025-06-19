import express from "express";
import {listProduct,addProduct,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router()

// creating 4 routes for different product operations
// upload is a middleware which will parse the images
// we have added a middlerware adminAuth to authenticate the admin to add or remove product
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.get('/single',singleProduct)
productRouter.get('/list',listProduct)

export default productRouter