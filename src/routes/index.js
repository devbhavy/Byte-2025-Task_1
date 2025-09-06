const express = require("express");
const { repoRouter } = require("./repo.routes");


const rootRouter = express.Router();

rootRouter.use("/",repoRouter);





rootRouter.use("/",function(err,req,res,next){
    res.status(400).send("some error occurred!!");
});




module.exports = {rootRouter}