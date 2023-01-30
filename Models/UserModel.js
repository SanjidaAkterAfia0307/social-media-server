const mongoose =require ("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,

    },
    photo: {
        type: String,
    },
    followers: {
        type: [String],
    },
    followings: {
        type: [String],
    },
},
    { timestamps: true }

)

module.exports= mongoose.model("user", UserSchema);