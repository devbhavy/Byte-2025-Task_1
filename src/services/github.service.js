require('dotenv').config()
const { default: axios } = require("axios");
const {Octokit} = require("octokit");
const octokit = new Octokit({
    auth : process.env.GITHUB_TOKEN
});


async function fetchRepoData(url){
    console.log(process.env.GITHUB_TOKEN)
    const sep = url.split("/");
    const [owner,repo] = sep.splice(-2);

    

    try{
        const response = await octokit.request(`GET /repos/${owner}/${repo}`);
        return response.data;
    }catch(err){
        console.log("an error occurred while fetching repo data:", err.message);
        return null;
    }




}

async function fetchRepoStructure(repoUrl, path = "") {
    try {
        
        const sep = repoUrl.split("/");
        const [owner, repo] = sep.splice(-2);

        console.log({owner,repo})
        const repoInfo = await octokit.request(`GET /repos/${owner}/${repo}`);
        const branch = repoInfo.data.default_branch;

        
        const response = await octokit.request(
            `GET /repos/${owner}/${repo}/contents/${path}`,
            { owner, repo, path, ref: branch }
        );

        let structure = [];

        for (const item of response.data) {
            
            if (item.path.includes("node_modules")) continue;

            const entry = {
                name: item.name,
                path: item.path,
                type: item.type,
            };

            if (item.type === "dir") {
                entry.children = await fetchRepoStructure(repoUrl, item.path);
            }

            structure.push(entry);
        }

        return structure;
    } catch (err) {
        console.log("Error while fetching repo structure:", err.message);
        return [];
    }
}




module.exports = {fetchRepoData,fetchRepoStructure};