import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {

    const { token } = req.headers
    
    if (!token) {
        return res.json({ success: false, message: 'Not Authorised Login Again' })
    }
    try {
        // if token is available we will decode the token -- this will give a string 
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // adding the user Id in the request body from the decoded token
        req.body.userId = token_decode.id
        next()



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export default authUser