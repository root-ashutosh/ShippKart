import userModel from "../models/userModel.js"


//  add products to user cart
const addToCart = async (req, res) => {

    try {

        // getting the user id from req body which we added in the middleware during authentication
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        // updating cart data
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1

            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        // sending the updated cartdata to the database
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Added to cart' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}


//  update user cart
const updateCart = async (req, res) => {

    try {

        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        // updating quantity in cart
        cartData[itemId][size] = quantity

        // sending the updated cartdata to the database
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: ' Cart Updated ' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}
//  get user cart data
const getUserCart = async (req, res) => {

    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        // sending the cartdata in response
        res.json({ success: true, cartData })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export { addToCart, updateCart, getUserCart }