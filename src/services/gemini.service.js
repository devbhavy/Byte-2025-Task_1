
const {GoogleGenAI} = require("@google/genai");
require("dotenv").config();



const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
})


async function generateReadMe(data){
    const prompt = `
You are an expert open-source README writer.

Generate a professional README in **GitHub-flavored Markdown** for the following repository data. 
Follow this structure strictly:

1. A visually appealing header:
   - A centered project banner (if repo contains one in assets/images).
   - A centered project title with a short tagline (1 line, no marketing fluff).
   - A centered badge section (license + main technologies detected from repo data).

2. ## Description
   - Concise, factual summary of the project (use repo description if available).

3. ## ✨ Features
   - Bullet list of actual features, only if supported by repo data.
   - Do not hallucinate new features.

4. ## 🚀 Installation
   - Step-by-step instructions: clone → install deps → run.
   - Use the correct package manager (detected from lockfile: package-lock.json → npm, yarn.lock → yarn, pnpm-lock.yaml → pnpm).

5. ## 🛠️ Tech Stack
   - List frameworks, languages, and tools **only from repo data**.

6. ## 📂 Project Structure
   - Render a simplified directory tree.
   - Skip node_modules, build artifacts, lockfiles, and hidden files.

7. ## 📄 License
   - Extract license info if available. If none, write "No license specified".

Important constraints:
- Use Markdown with minimal inline HTML (like <p align="center"> or <img>), but never <div>.
- Do NOT invent features, tools, or services.
- Keep tone developer-friendly and professional, not marketing-heavy.

Here is the repo data:
${JSON.stringify(data, null, 2)}
`;


    const response = await ai.models.generateContent({
       model : "gemini-2.5-flash",
       contents : prompt 
    })

    return response.text;



}

module.exports = {generateReadMe}



