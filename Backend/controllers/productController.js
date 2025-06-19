import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';

// Funtion for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        // if the image exists in the files then only extract it else leave it as undefined --- to avoid error if any image is missing in files  
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // storing all the defined images in array 
        const images = [image1, image2, image3, image4].filter((item) => item != undefined)

        // uplaoding images on cloudinary to get the URL to save in database
        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        // creating a object to store product data on database -- we will get data as a string from frontend so wherever required we will convert them in there desired form
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes), // converting string to array
            image: imagesURL,
            date: Date.now()

        }
        console.log(productData);
        //    storing the data using the product model
        const product = new productModel(productData)
        await product.save();

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Funtion for list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}
// Funtion for removing product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Funtion for single product
const singleProduct = async (req, res) => {
try {
    const {productId} = req.body;
    const product = await productModel.findById(productId)
    res.json({success:true,product})

} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}


export { listProduct, addProduct, removeProduct, singleProduct }