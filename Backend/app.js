const express=require("express")
const mongoose =require("mongoose")
const cors =require("cors")

const app=express()
app.use(cors())
app.use(express.json())

//DataBase Connection
const url='mongodb://127.0.0.1/SocietyManagement'
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
con.on('open',()=>{
	console.log("server connected..")
})

const register=require('./Routes/register')
const login=require('./Routes/login')
const societyList=require('./Routes/societyList')
const profile=require('./Routes/membersList')
const billDetails=require('./Routes/billDetails')
const emailverification=require('./Routes/emailverification')

app.use('/register',register)
app.use('/login',login)
app.use('/societyList',societyList)
app.use('/profile',profile)
app.use('/assignbills',billDetails)
app.use('/emailverification',emailverification)

app.listen(9000,()=>{
	console.log("localhost connected..")
})