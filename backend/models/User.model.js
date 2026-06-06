import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    photo:String,
    role:{
        type:String,
        enum:["farmer","seller","admin"],
        default:"farmer"
    },   
},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User;