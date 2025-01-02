console.log("saeed")
const mongoose=require("mongoose")
const router=require("./routes/User")
const jobrouter=require("./routes/Job")
const express=require("express")
const cors = require("cors");
const bodyparse=require("body-parser") 
const app=express()
app.use(express.json())
app.use(cors());
app.use(bodyparse.json())
app.use("/user",router)
app.use("/job",jobrouter)
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_URI; 
mongoose.connect(mongoURI).then(()=>{      
    console.log("data base connected");
}) 


app.listen(4000,()=>{
    console.log("server started 4000");  
})