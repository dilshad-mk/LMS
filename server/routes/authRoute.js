const {registerUser,loginUser,getUser,resetPswdOtpVerify} = require("../controllers/user");
const {signUpOTPSend} = require("../controllers/signUpSendOTP");
const {sendForgotPswdOTP} = require("../controllers/forgotPswdOtp");
const express = require("express");
const route = express.Router();

route.post("/signup", registerUser);
route.post("/login", loginUser);
route.post("/sendotp", signUpOTPSend);
route.post("/forgot",sendForgotPswdOTP);
route.post("/pswdOtp",resetPswdOtpVerify)






module.exports = route; 