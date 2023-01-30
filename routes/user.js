const express =require ("express")
const passport =require ("passport");
const {  signup, signin, signout, getUser, getFollower, getFollowing, follow, unFollow } =require ("../controllers/user.js");



const userRoutes=express.Router();
userRoutes.post("/signup",signup)
userRoutes.post("/signin",passport.authenticate("local"),signin)
userRoutes.post("/signout",signout)
userRoutes.get("/:username",getUser)
userRoutes.get("/:username/followers",getFollower)
userRoutes.get("/:username/following",getFollowing)
userRoutes.put("/:username/follow",follow)
userRoutes.put("/:username/unfollow",unFollow)
// userRoutes.post("/:username/follow",signout)


module.exports = userRoutes;