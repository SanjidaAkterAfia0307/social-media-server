const bcrypt = require('bcryptjs')
const Post = require('../Models/PostModel.js')
const User = require("../Models/UserModel.js")

const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (user) return res.status(200).send({ massage: "USer exists" });


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
}
const signin = async (req, res, next) => {
  res.send(req.user)
}
const signout = async (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.send({ massege: "Hii" });
  })
}

const getUser = async (req, res, next) => {
  try {
    const username = req.params.username

    const user = await User.findOne({ username });

    res.status(200).json(user)
  } catch (er) {
    next(er)
    console.log(er)
  }
}

const getFollower = async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await User.findOne({ username })
    const followers = user.followers;

    const list = await Promise.all(
      followers.map(async (id) => {
        return await User.findById(id)
      })
    )
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (er) {
    next(er)
  }
}
const getFollowing = async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await User.findOne({ username })
    const followings = user.followings;

    const list = await Promise.all(
      followings.map(async (id) => {
        return await User.findById(id)
      })
    )
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (er) {
    next(er)
  }
}

const follow = async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await User.findOne({ username });
    await User.updateOne({ username }, { followings: [...user.followings, req.body.userId] })


    const user2 = await User.findById(req.body.userId);
    await User.updateOne({ username: user2.username }, { followers: [...user2.followers, user._id] })

    res.status(200).json("Subscription Successful!")
  } catch (er) {
    next(er)
  }
}
const unFollow = async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await User.findOne({ username });
    const followings = user.followings.filter(id => id !== req.body.userId)
    await User.updateOne({ username }, { followings: [...followings] })


    const user2 = await User.findById(req.body.userId);
    const followers = user.followers.filter(id => id !== user._id)
    await User.updateOne({ username: user2.username }, { followers: [...followers] })

    res.status(200).json("Unsubscription Successful!")
  } catch (er) {
    next(er)
  }
}

module.exports = { signup, signin, signout, getUser, getFollower, getFollowing, follow, unFollow }