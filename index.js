const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const expressSession = require("express-session");
const { initializingPassport } = require("./passportConfig.js");
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(expressSession({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

initializingPassport(passport)

// console.log(process.env.MONGOOSE)
const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(`${process.env.MONGOOSE}`)
        .then(() => {
            console.log("Connected To DB")
        }).catch(er => {
            console.error(er);
        })
}



app.use("/users", userRoutes)
app.use("/posts", postRoutes)


app.listen(7000, () => {
    connect()
    console.log("Connected !")
})
