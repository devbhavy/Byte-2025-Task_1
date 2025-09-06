const zod = require("zod");

const githubUrlRegex = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/;

const linkSchema = zod.object({url : zod.string().url("invalid URL format").regex(githubUrlRegex,"URL must be in the format https://github.com/owner/repo")});


function linkValidation(req,res,next){
    const input = req.body;

    const check = linkSchema.safeParse(input);
    if(!check.success){
        return res.status(400).json({
            msg : "invalid input"
        })
    }else{
        
        req.url = input.url;
        console.log(input.url)
        return next();

    }

}

module.exports  = {linkValidation}