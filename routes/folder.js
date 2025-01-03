
const express=require("express")
const route=express.Router()
// const mongoose=require("mongoose")
const folder=require("../Schema/folderschema")
const auth=require("../middleware/auth")


//creating folder post

route.post("/create",auth,async(req,res)=>{

    const {foldername}=req.body;
    console.log(foldername);
    const fn=await folder.findOne({foldername});
    console.log(fn);
    if(fn){
        return res.status(400).json({message:"folder already exist"})
    }
      
    const id=req.userid
    console.log(id);
    // console.log(req.cookies.token)
     const folders= await folder.create({
        foldername,
        user:id.id
     })

    return res.status(200).json({message:"folder created",folders:folders}) 
})

//get all folders
route.get("/find",async (req,res)=>{
    // const {id}=req.params;
    // const {limit,skip}=req.query
    try {
    //    const jobs=await job.find().skip(skip).limit(limit)
    const folders=await folder.find()
       res.status(200).json(folders)
    }catch(err){
        res.json({status:fail,message:"no folders created yet"})
    }
    // if(job){return res.status(200).json({message:"job found"}) }
}) 

//find and delet the folder

route.delete("/delete/:fn",auth,async(req,res)=>{
    
    const foldername=req.params.fn;
    console.log(foldername);
    const folderid=await folder.findOne({foldername})
    console.log(folderid);
    if(!folderid){
        return res.status(400).json({message:"folder not found"})
    }
    await folder.deleteOne({foldername:foldername});
    res.status(200).json({message:"folder deleted"})
})



module.exports=route;