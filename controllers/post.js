const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");

const createPost = async (req, res, next) => {
    try {
        const id = req.params.userId;
        console.log(id)
        const user = await User.findById(id)
        const { username, email, photo } = user
        const newPost = new Post({ ...req.body, userId: id, username, email, photo });
        console.log(req.body);
        console.log(newPost);
        await newPost.save();

        res.status(200).send(newPost);
    } catch (err) {
        next(err);
    }
}
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (er) {
        next(er)
    }
}
module.exports = { createPost, getPosts }