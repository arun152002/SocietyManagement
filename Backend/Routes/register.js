const express=require("express")
const router=express.Router()
const register=require("./Schemas/registerSchemas")

router.post('/',async(req,res)=>{
    const Email=req.body.Email
    const exists=await register.findOne({Email})
    if(exists){
        return res.send({message:"Already Exists"})
    }else{
        const data=register({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:req.body.Password,
            Society:req.body.Society,
            BlockNumber:req.body.Block,
            role:req.body.Role
        })
        await data.save()
        res.send({data:data,userId:data._id})
        console.log("Posted")
    }
})

router.get('/:sname',async(req,res)=>{
    const sname=req.params.sname
    const findData=await register.find().or([{Society:sname}])
        res.json(findData)  
})
router.get('/details/:userId',async(req,res)=>{
    const userId=req.params.userId
    const findData=await register.find().or([{_id:userId}])
    // console.log(findData)
    res.json(findData)

})
router.put('/',async(req,res)=>{
    const update=await register.update(
        {_id:req.body._id},{$set:{
            FamilyMembers:req.body.FamilyMembers
        }})
})
router.put('/password',async(req,res)=>{
    const _id=req.body._id
    const oldpass=req.body.oldPass
    register.findOne({_id},async(err,user)=>{
        if(user){
            if(oldpass==user.Password){
                const update=await register.update(
                    {_id},{$set:{
                        Password:req.body.newPass
                    }})
                res.send({message:true})
            }else{
                res.send({message:false})
        }
        }else{
            console.log(err)
        }
        
    })
})
    
module.exports=router