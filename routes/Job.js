const express=require("express")
const route=express.Router()
// const mongoose=require("mongoose")
const job=require("../Schema/jobschema")
const auth=require("../middleware/auth")

//find
// /?limit=2&skip=1
route.get("/find",async (req,res)=>{
    // const {id}=req.params;
    // const {limit,skip}=req.query
    try {
    //    const jobs=await job.find().skip(skip).limit(limit)
    const jobs=await job.find()
       res.json(jobs)
    }catch(err){
        res.json({status:fail,message:"no jobs posted yet"})
    }
    // if(job){return res.status(200).json({message:"job found"}) }
})

route.get("/:id",async(req,res)=>{
    const {id}=req.params;
    const jobs=await job.findById(id)
    if(!job){return res.json({status:fail,message:"job not found with matching id"})}
    return res.status(200).json(job)
})

    


route.post("/jc",auth,async(req,res)=>{
   
    const {companyname,jobposition,salary}=req.body;
    const id=req.userid
    console.log(id);
    // console.log(req.cookies.token)
     const jobs= await job.create({
        companyname,
        jobposition,
        salary,
        userid:id.id
     })

    return res.status(200).json({message:"job created",jobs:jobs}) 
})
route.delete("/:id",auth,async(req,res)=>{
    const id=req.params.id;
    const j1=await job.findById(id)
    const id1=req.userid.id;
    if (!j1) {
        return res.status(404).json({ message: "Job not found" });
    } 
    console.log(id1 +"from auth tojob") 
    console.log(j1.userid+"from db");
    if(id1!==j1.userid.toString()){
        return res.status(400).json({message: "you are not allowed to delet this job"})
    }

     await job.deleteOne(j1)
    return res.status(200).json({message:"job deleted",j1}) 
})
route.put("/:id",auth,async (req,res)=>{
    const {companyname,jobposition,salary}=req.body;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }
    if (job.userid.toString()!==req.userid.id) {   // check if the user is the owner of the job
        return res.status(401).json({ message: "You are not authorized to update this job" });
    }
    const j1=await job.findByIdAndUpdate(req.params.id,{
        companyname,
        jobposition,
        salary,
        userid:id.id
    })
    res.status(200).json({ message: "Job updated" });


})


module.exports=route

