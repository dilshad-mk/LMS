const OTP = require("../models/otp");
const sendEmail = require("../utils/sendEmail");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await OTP.findOneAndDelete({ email });

    await OTP.create({
      email,
      otp,
      expiresAt:
        Date.now() + 10 * 60 * 1000
    });

    await sendEmail(email, otp);

    res.status(200).json({
      message: "OTP sent successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};