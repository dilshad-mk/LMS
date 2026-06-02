const {registerUser,loginUser,getUser} = require("../controllers/user");
const {sendOTP} = require("../controllers/sendOtp")
const express = require("express");
const route = express.Router();

route.post("/signup", registerUser);
route.post("/login", loginUser);
route.post("/sendotp", sendOTP)



module.exports = route; 