const mongoose=require("mongoose")

const jobschema=new mongoose.Schema({

    companyname:{type:String,required:true},
    jobposition:{type:String,required:true},
    salary:{type:Number,required:true},
    // jobtype:{type:String,required:true, enum: ["full-time", "part-time", "contract", "internship", "freelance"],},
    // location:{type:String,required:true},
    // modeofwork:{type:String,required:true,enum :["remote","office"]},
    userid:{  type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,}
  })

  const js= mongoose.model("Job",jobschema)
module.exports=js