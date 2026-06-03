const OTP = require("../models/otp");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

exports.sendForgotPswdOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const isUserExist = await User.findOne({email});

    if(!isUserExist){
      return res.status(404).json({
        message : "Email is not registerd! please Sign up"
      })
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await OTP.findOneAndDelete({ email, purpose:"forgot-password" });

    await OTP.create({
      email,
      otp,
      expiresAt:
        Date.now() + 10 * 60 * 1000,
      purpose: "forgot-password" 
    });

    await sendEmail(email, otp);

    // temperory token for reset pswd-------
    const resetToken = jwt.sign(
      {email,purpose : "reset-password"},
      process.env.JWT_SECRET,
    {expiresIn : "10m"}
    )

    res.status(200).json({
      message: "OTP sent successfully",resetToken
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};