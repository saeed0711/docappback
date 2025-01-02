const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    Username:{
    type:String,
    required:true
},
email:{type:String,required:true,unique:true},
password: {
    type: String,
    required: true,
},
// mobile: {
//     type: String,
//     required: true,
// },

})

const usermodel= mongoose.model("User",userSchema)

module.exports=usermodel
