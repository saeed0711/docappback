const mongoose=require("mongoose")

const folderSchema=new mongoose.Schema({
foldername:{
    type:String,
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}})
const foldermodel=mongoose.model("Folder",folderSchema)
module.exports=foldermodel;