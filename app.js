const express=  require('express')
const app = express();
const mongoose= require('mongoose')

app.get("/hello",(req,res)=>{
    res.send("hello");
})

mongoose.connect().then(()=>{
    console.log("connected")
}).
catch((err)=>{
    console.log("error",err)
})

