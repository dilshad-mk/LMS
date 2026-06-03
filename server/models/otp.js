const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },

    otp : {
        type: String,
        required: true
    },

    expiresAt : {
        type :Date,
        required :true
    },
    purpose:{
        type: String,
        enum : ["signup", "forgot-password"]
    }
})

module.exports = mongoose.model("OTP", otpSchema)