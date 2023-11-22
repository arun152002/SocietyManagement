const mongoose=require("mongoose")
const register=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Society:{
        type:String,
        required:true
    },
    BlockNumber:{
        type:Number
    },
    FamilyMembers:{
        type:Number,
        default:0
    },
    role:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("register",register)