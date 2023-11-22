const express = require("express");
const nodemailer = require('nodemailer');
const router=express.Router()
const register=require('./Schemas/registerSchemas')

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}
var otp=between(100000,999999)

router.post('/',async(req,res)=>{
Email=req.body.toEmail 
register.findOne({Email},async (err,user)=>{
  if(user){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: 'societymanagement.help@gmail.com',
      pass: 'dgtmtovmojptsfuq'
      }
    }); 
    let mailOptions = {
      from: 'societymanagement.help@gmail.com',
      to: `${Email}`,
      subject: 'Society Financial Management',
      text:`Your OTP for Email Verification: ${otp}` 
    };
    transporter.sendMail(mailOptions,async function(error, info){
      if (error) {
        console.log(error);
      } else {
            res.send({message:"OTP sent to Email"})
      }
    })
    // console.log("Available")
  }else{
    // console.log("Not Available")
    res.send({message:"Not Registered"})
  }
}) 
})

router.post('/otp',async(req,res)=>{
  userotp=req.body.uotp
  if(otp==userotp){
    const update=await register.updateOne(
        {Email},{$set:{
            Password:req.body.password
        }})
    res.send({response:"Password Changed"})
  }else{
    res.send({response:"Not Matched"})
  }
})

module.exports=router