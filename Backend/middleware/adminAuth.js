import jwt from "jsonwebtoken";


const adminAuth = async(req,res,next)=>{
    try {
        const { token } = req.headers

        if (!token){ // if the token is not available stop the execution here
            return res.json({success:false,message:"Not Authorised Login again"})
        }
        // if token is available we will decode the token -- this will give a string 
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        //  now we will verify the decoded token
        if (token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){ //not matching 
            return res.json({success:false,message:"Not Authorized try Login again"})
        }
        // matching -- then call our callback fn. next() -- to pass the request to the next handler ..ex.= add/remove
        next()


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export default adminAuth