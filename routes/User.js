
const express=require("express")
const route=express.Router()
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const User=require("../Schema/userschema")
const bcrypt=require("bcrypt")
// const { json } = require("body-parser")

dotenv.config()


route.get("/find",async (req,res)=>{
    // const {name,email,password}=req.body
   
    const u=await User.find();
    console.log(u);
   if(!u){return  res.status(500).json({message:"errore"})}
    res.json(u)
   

})

route.get("/find/:name",async (req,res)=>{
    const name=req.params.name;
    const std=await User.findOne({name});
    if(!std){return res.status(404).json({message:"bad reuest"})}
    res.json(std)
})
  

route.post("/register",async (req,res)=>{
console.log(req.body);
    const {Username,email,password}=req.body
    console.log(Username +email+password);
    const temp=await User.findOne({email})
    if(temp){
       return res.status(404).json({message:"user alredy existed please login"})
    }
   const hashpass=await bcrypt.hash(password,10);
   try{
    
   await User.create({  
    Username,
    email,
    password: hashpass
   })
  return res.status(200).json({ message: "User created" });

   }catch(error){
    return res.status(400).json(error.message);
   }



})

route.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(password);  
    console.log(email);
    const user= await User.findOne({email})
    console.log(user);
    if(!user){
        return res.status(400).json({message:"please enter right credentials"})
    }
    const verify=await bcrypt.compare(password,user.password)
    console.log(verify);
    if(!verify){
        return res.status(400).json({message:"please enter right credentials"})
    }
    const token=await jwt.sign({id:user._id},"secret",{expiresIn:"4h"})
    
    
    // res.cookie("token",token)  
    console.log("sent");
    return res.status(200).json({message:"logged in",token:token,user:user})
})  

  



module.exports=route
