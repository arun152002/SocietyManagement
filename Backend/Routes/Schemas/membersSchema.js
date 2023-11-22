const mongoose=require("mongoose")
const membersList=new mongoose.Schema({
	MemberName:{
		type:String,
		required:true,

	},
	PhoneNumber:{
		type:Number,
		required:true,
		default:0
	},
	FamilyMembers:{
		type:Number,
		default:0
	},
	Address:{
		type:String,
		required:true,
		default:"None"
	},
	userId:{
		type:String,
		required:true
	}
})

module.exports=mongoose.model("membersList",membersList)