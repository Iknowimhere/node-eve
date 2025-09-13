import jwt from 'jsonwebtoken'
import User from '../models/User.js';
export const auth=async(req,res,next)=>{
    try {
        let token=req.headers?.authorization?.split(" ")[1];
        if(!token){
            res.status(400).json({message:"Please Authenticate"})
            return
        }
        let decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        let user=await User.findById(decodedToken.id)
        if(!user){
            res.status(400).json({message:"Invalid token"})
            return
        }
        req.userId=user._id;
        next()
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}