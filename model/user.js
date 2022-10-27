const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Please provide a valid email"]
    },
    password: {
        type: String,
        require: [true, "Please provide a password"]
    },
    name: {
        type: String,
    },
})

module.exports = mongoose.model('User', userSchema)