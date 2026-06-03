

const mongoose = require("mongoose");

 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true
    },
 password: {
  type: String,
  required: true,
  select: false
},

    role: {
        type: String,
        enum:[
            "student",
            "teacher",
            "admin"
        ],
        
    },

    status: {
        type: String,
        enum: ["pending","approved", "rejected"],
        default: "approved"
    }


})

module.exports = mongoose.model("user", userSchema)