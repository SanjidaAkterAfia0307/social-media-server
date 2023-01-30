const express =require ("express");
const { createPost, getPosts } = require("../controllers/post.js");




const postRoutes=express.Router();
postRoutes.post("/:userId",createPost)
postRoutes.get("/",getPosts)


module.exports = postRoutes;