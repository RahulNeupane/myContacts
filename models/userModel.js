const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
    },
    email: {
        type: String,
        required: [true, "Please provide user email"],
        unique: [true, "Email id already taken"],
    },
    password: {
        type: String,
        required: [true, "Please provide user password"],
    },
},{
    timestamps: true
})
module.exports = mongoose.model("User",userSchema)