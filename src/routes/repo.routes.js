const express = require("express");
const { linkValidation } = require("../middlewares/middlewares");
const { createReadme } = require("../controllers/readme.controller");
const repoRouter = express.Router();

repoRouter.post("/public/generate-readme",linkValidation,createReadme);




module.exports = {repoRouter};


