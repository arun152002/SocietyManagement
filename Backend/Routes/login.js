const express=require("express")
const router=express.Router()
const register=require('./Schemas/registerSchemas')

router.post('/',async(req,res)=>{
try{
    const {Email,Password} =req.body;
        
    register.findOne({Email},async (err,user)=>{
        if(user){
            
           if(Password==user.Password){
                    res.send({user:user,data:user._id,role:user.role})
                    console.log("success")
                    // console.log(user._id)
                    // console.log(user.role)
                }    
           else{
               res.send({message:"wrong credentials"})
               console.log("error: "+err)
           }
        }else{
            res.send({message:"not register"})
        }
    })
}catch(err){
    return console.log("in Login "+err)
}   
}) 
module.exports=router 