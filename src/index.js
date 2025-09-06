const express = require("express");
const { rootRouter } = require("./routes");
const port = 3000;
const app = express();
require('dotenv').config();


app.use(express.json());



app.use("/app/",rootRouter)

app.get("/",function(req,res){
    res.send({msg : "hi there"})
})
// app.get("/",function(req,res){
//     res.send("hi there")
// })

app.listen(port,()=>{
    console.log("server started!!")
})


