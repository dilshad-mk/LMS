const bcrypt = require("bcrypt");

const { generateToken } = require("../utils/generateToken")
const User = require("../models/user");
const OTP = require("../models/otp");

const validator = require("validator");


// user registration(sign up) controller  
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role, otp } = req.body;


        const emailExist = await User.findOne({ email });

        // if(!email || !password || !role || !username){
        //     return res.status(400).json({message : "All fields required!"})
        // };

        // role validation 
        if (!role) {
            return res.status(400).json({ message: "Please select a role!" })
        };
        if (!["student", "teacher"].includes(role)) {
  return res.status(400).json({
    message: "Invalid role",
  });
}


        // user name validation
        if (!username) {
            return res.status(400).json({ message: "Name required!" });
        };

        // email validation 

        if (!email) {
            return res.status(400).json({ message: "Email is required!" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format "
            });
        }

        if (emailExist) {
            return res.status(400).json({
                message: "Email already registered by another user!"
            })
        };

        // password validation 
        if (!password) {
            return res.status(400).json({
                message: "Password required!"
            })
        };

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                message: "Password must contain 8 characters & at least one lowercase, uppercase,number,symbol"
            })
        }

        //   validate otp ----------------------
        const otpRecord =
            await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({
                message: "Please request an OTP!"
            });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }
        if (otpRecord.expiresAt < Date.now()) {
            return res.status(404).json({
                message: "OTP expired"
            })
        }





        const hashedPassword = await bcrypt.hash(password, 10);

        const status = role === "teacher" ? "pending" : "approved";

        // create user
        const newUser = await User.create({ username, email, password: hashedPassword, role, status });

        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status
        }

        if (role === "teacher") {
            return res.status(201).json({
                message: "Teacher registration successful! Your account is pending for approval.",
                userResponse
            });
        }

        await OTP.deleteOne({ email }).sort({ createdAt: -1 });

        res.status(201).json({
            message: "User registered successfully!",
            userResponse,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error!", error: error.message })
    }
}

// user login controller / jwt token generation 
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        // validation email checking
        if (!user) {
            return res.status(400).json({
                message: "User not found please signUp"
            });
        }

     


        // validation password checking 
        const isMatch = await bcrypt.compare(
            password, user.password
        );
        //  if pswd not match validation 
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        };

        if (user.role === "teacher" && user.status === "pending") {
            return res.status(403).json({
                message: "Your account is pending for approval. Please wait for admin approval."
            });
        };

        if (user.role === "teacher" && user.status === "rejected") {
            return res.status(401).json({
                message: "Your request rejected by admin!"
            })
        }

        // token creation 
        const token = generateToken(user._id);



        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status
            },
            message: "Login successful"
        })

    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// reset pswd controller otp verification

exports.resetPswdOtpVerify = async (req, res) => {
    try {

        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({
            email,
            purpose: "forgot-password"
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({
                message: "Please request an OTP first!"
            });
        }

        if (otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // Delete OTP after successful verification
        await OTP.deleteOne({
            email,
            purpose: "forgot-password"
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "OTP verified successfully",
         
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// reset password /-------------------
exports.resetPswd = async (req, res) => {
    try {
        const { password } = req.body;
        const userFound = await User.findOne({ email: req.user.email }).select("+password");

        if (!userFound) {
            return res.status(404).json({
                message: "User not found"
            });
        };

        if (!password) {
    return res.status(400).json({
        message: "Password is required"
    });
}

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                message: "Password must contain 8 characters & at least one lowercase, uppercase,number,symbol"
            })
        }
//     
//   old pswd comparison
        const isSamePassword = await bcrypt.compare(
            password,
            userFound.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                message: "New password cannot be the same as current password"
            });
        }
        // hashing password by bcrypt-------
        const hashedPassword = await bcrypt.hash(password, 10);

        userFound.password = hashedPassword;

        await userFound.save();

        return res.status(200).json({ message: "Password updated successfully!" });


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// user protected route to dashboard access 
exports.getme = async (req, res) => {
    try {
        const user = await User.findById(
            req.user.id
        ).select("-password");

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}