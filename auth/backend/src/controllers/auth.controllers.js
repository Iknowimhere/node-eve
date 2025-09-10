import User from "../models/User.js";

const register = async (req, res, next) => {
  try {
    // TODO: get user body(username,email,password and confirm password)
    const {username,email,password,confirmPassword}=req.body;
    if(!username || !email || !password || !confirmPassword){
        res.status(400).json({ message: "Please fill all fields" });
        return
    }
    //TODO:check user exits
    let existingUser=await User.findOne({email})
    //TODO:if user exists ask him to login
    if(existingUser){
        res.status(400).json({ message: "Already registered please login" });
        return
    }
    //TODO:else create new user
    let newUser=await User.create({
        username,email,password,confirmPassword
    })
    if(!newUser){
         res.status(400).json({ message: "Sorry user was not created!!" });
        return
    }
    //TODO:send response
    res.status(200).json({
        message:"Registered successfully",
        newUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  try {
    // TODO: get user body(email,password)
    let {email,password}=req.body
    //TODO:check user exits
    let existingUser=await User.findOne({email})
    //TODO:if user doesnt exist ask him/her to register first
    if(!existingUser){
        res.status(400).json({ message: "User doesnt exist please register" });
        return
    }
    //TODO:if user exists
    // TODO:verify password
    let isMatch=await existingUser.comparePassword(password,existingUser.password)
    if(!isMatch){
        res.status(400).json({ message: "Password doesnt match!!" });
        return
    }
    //TODO:send response
     res.status(200).json({
        message:"Logged In successfully",
        existingUser
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
