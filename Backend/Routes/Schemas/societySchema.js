const mongoose=require("mongoose")
const societyList=new mongoose.Schema({
	SocietyName:{
		type:String,
		required:true
	},
	City:{
		type:String,
		required:true
	},
	Pincode:{
		type:Number,
		required:true
	},
	SecretaryName:{
		type:String,
		required:true
	}
})
module.exports=mongoose.model("societyList",societyList)