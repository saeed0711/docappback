const mongoose=require("mongoose")

const formSchema=new mongoose.Schema({
formname:{
    type:String,
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
folder:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Folder"
},
File:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"File"},

image:{
    type:String
},
text:{
    type:String
},
email:{
type:String
},
number:{
type:String
},
phone:{
type:String
},
rating:{
type:String,
enum:["1","2","3","4","5"]
},
date:{
type:Date,
},
button:{
type:String
}

})
const formmodel=mongoose.model("Folder",formSchema)
module.exports=formmodel;