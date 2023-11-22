const express=require("express")
const router=express.Router()
const membersList=require("./Schemas/membersSchema")

router.post('/',async(req,res)=>{
        const data=membersList({
        	MemberName:req.body.Name,
            userId:req.body.userId
        })
        await data.save()
        res.send(data)
        console.log("Posted")
})
router.get('/:userId',async(req,res)=>{
	 const userId=req.params.userId
    const findData=await membersList.find().or([{userId:userId}])
        res.json(findData)  
})
router.put('/',async(req,res)=>{
    const update=await membersList.update(
        {userId:req.body.userId},{$set:{
            PhoneNumber:req.body.Phone,
            FamilyMembers:req.body.FamilyMembers,
            Address:req.body.Address
        }})
    res.json(update)
})
module.exports=router
