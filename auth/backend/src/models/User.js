import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate:{
        validator:function(value){
            return value.toString().toLowerCase().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        },
        message:"Enter proper email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 6,
    validate:{
        validator:function(value){
            return value===this.password
        },
        message:"Password and confirm password do not match"
    }
  },
},{timestamps:true});

//hook //pre middleware
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
    this.confirmPassword=undefined;
    next()
})

//methods which can be used on instance of model
userSchema.methods.comparePassword=async function(pwd,pwdDB){
    return await bcrypt.compare(pwd,pwdDB)
}


let User=model("User",userSchema);

export default User
