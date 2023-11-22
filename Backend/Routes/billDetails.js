const express=require("express")
const router=express.Router()
const billDetails=require("./Schemas/billDetailsSchema")

router.post('/',async(req,res)=>{
        const data=billDetails({
        	userId:req.body.userId
        })
        await data.save()
        res.send(data)
        console.log("Posted")
})

router.get('/:userId',async(req,res)=>{
	 const userId=req.params.userId
    const findData=await billDetails.find().or([{userId:userId}])
        res.json(findData)  
})

router.put('/rent',async(req,res)=>{
    const update=await billDetails.update(
        {userId:req.body.userId},{$set:{
            HouseRent:req.body.billamount
        }})
    res.json(update)
})
router.put('/water',async(req,res)=>{
    const update=await billDetails.update(
        {userId:req.body.userId},{$set:{
           WaterBill:req.body.billamount 
        }})
    res.json(update)
})
router.put('/elec',async(req,res)=>{
    const update=await billDetails.update(
        {userId:req.body.userId},{$set:{
            ElectricityBill:req.body.billamount
        }})
    res.json(update)
})
router.put('/keeping',async(req,res)=>{
    const update=await billDetails.update(
        {userId:req.body.userId},{$set:{
            HouseKeeping:req.body.billamount
        }})
    res.json(update)
})
router.put('/parking',async(req,res)=>{
    const update=await billDetails.update(
        {userId:req.body.userId},{$set:{
            ParkingFee:req.body.billamount
        }})
    res.json(update)
})
router.put('/storage',async(req,res)=>{
    const update=await billDetails.update(
        {userId:req.body.userId},{$set:{
            StorageFee:req.body.billamount
        }})
    res.json(update)
})
router.put('/laundry',async(req,res)=>{
    const update=await billDetails.update(
        {userId:req.body.userId},{$set:{
            Laundry:req.body.billamount
        }})
    res.json(update)
})

module.exports=router