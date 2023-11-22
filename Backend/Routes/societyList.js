const express=require("express")
const router=express.Router()
const societyList=require("./Schemas/societySchema")

router.get('/',async(req,res)=>{
    const findData=await societyList.find()
    res.json(findData)
})

router.post('/',async(req,res)=>{
        const data=societyList({
            SocietyName:req.body.sName,
            City:req.body.sCity,
            Pincode:req.body.sPincode,
            SecretaryName:req.body.secName
        })
        await data.save()
        res.send(data)
        console.log("Posted")
})

router.put('/',async(req,res)=>{
    const update=await societyList.update(
        {_id:req.body._id},{$set:{
            SocietyName:req.body.sName,
            SecretaryName:req.body.secName
        }})
    res.json(update)
})
module.exports=router