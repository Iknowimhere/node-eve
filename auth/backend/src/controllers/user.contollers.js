import User from "../models/User.js";

export const getMe=async (req,res,next)=>{
    try {
        let user=await User.findById(req.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}