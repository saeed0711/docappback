const mongoose=require("mongoose")

const filemodel=new mongoose.Schema({
fileername:{
    type:String,
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}})
const filemodell=mongoose.model("Folder",filemodel)
module.exports=filemodell;