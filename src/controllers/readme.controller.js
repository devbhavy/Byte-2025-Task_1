require("dotenv").config()
const { default: axios } = require("axios");
const { generateReadMe } = require("../services/gemini.service");
const { fetchRepoData, fetchRepoStructure } = require("../services/github.service");


async function createReadme(req,res){

   
    const url = req.url;
    
    const myData =await fetchRepoData(url);

    if(myData==null){
        return res.status(400).json({
            msg : "some error occurred with the given repo!!"
        })
    }

    console.log("hi there")
    
    const name = myData.name;
    const description = myData.description;
    
   
    let licenseUrl;
    if(myData.license==null){
        
        licenseUrl = "URL not available";

    }else{
            
        const licenseObject = await axios.get(myData.license.url);
        licenseUrl = licenseObject.data.html_url||null;
    }

    
    const topics = myData.topics;

    
    const languagesObject = await axios.get(myData.languages_url,{
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}` // pass the GitHub OAuth token
        }
      });
   
    const languages = languagesObject.data;
    

    
    const structure = await fetchRepoStructure(url);


    const inputObject = {name,description,licenseUrl,topics,languages,structure};
    console.log(inputObject)

    const readMe = await generateReadMe(inputObject);
    res.status(200).send(readMe);
}



module.exports = {createReadme}