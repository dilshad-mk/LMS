const bcrypt = require("bcrypt");

const {generateToken} = require("../utils/generateToken")
const User = require("../models/user");
const OTP = require("../models/otp");

const validator = require("validator");


// user registration(sign up) controll  
exports.registerUser = async (req,res) => {
    try{
        const {username,email,password,role,otp} = req.body;
        

        const emailExist = await User.findOne({email});
        
        // if(!email || !password || !role || !username){
        //     return res.status(400).json({message : "All fields required!"})
        // };

          // role validation 
        if(!role){
            return res.status(400).json({message : "Please select a role!"})
        };
        

             // user name validation
        if(!username){
            return res.status(400).json({message : "Name required!"});
        };

        // email vaildation 
        
        if(!email){
            return res.status(400).json({message: "Email is required!"});
        }
                if(!validator.isEmail(email)){
                    return res.status(400).json({
                        message : "Invalid email format "
                    });
                }

        if(emailExist){
            return res.status(400).json({
                message : "Email already registerd by another user!"
            })
        };
        
        // password validation 
        if(!password){
            return res.status(400).json({
                message :"Password required!"
            })
        };

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({
                message :"Password must contain 8 characters & atleast one lowercase, uppercase,number,symbol"
            })
        }
        
    //   validate otp ----------------------
                const otpRecord = 
                await OTP.findOne({email});

                if(!otpRecord){
                    return res.status(400).json({
                        message : "Please request an OTP!"
                    });
                }

                if(otpRecord.otp !== otp){
                    return res.status(400).json({
                        message : "Invalid OTP"
                    });
                }
                if(otpRecord.expiresAt < Date.now()){ 
                    return res.status(404).jsom({
                        message : "OTP expired"
                    })
                }


      


        const hashedPassword = await bcrypt.hash(password ,10);

            const status = role === "teacher" ? "pending" : "approved";

        // create user
        const newUser = await User.create({username,email,password : hashedPassword,role,status});

        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status
        }

        if(role === "teacher"){
            return res.status(201).json({
                message : "Teacher registration successful! Your account is pending for approval.",
                userResponse
            });
        }
        
        await OTP.deleteOne({email});
        
        res.status(201).json({
            message : "User registerd successfully!",
            userResponse,
        });
    }catch(error){
        res.status(500).json({message : "Server error!", error : error.message})
    }
}

// user login controll / jwt token generation 
exports.loginUser = async (req,res) => {
   try{
     const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    // validation email checking
    if(!user){
        return res.status(400).json({
            message : "User not found please signUp"
        });
    }

// console.log("Requesr body" , req.body );
// console.log("email:" , email );
// console.log("pswd:" , password );
// console.log("user:" , user );
// console.log("user pswd:" , user?.password );




    // validation password checkin 
    const isMatch = await bcrypt.compare(
        password, user.password
    );
//  if pswd not match validation 
    if(!isMatch){
        return res.status(400).json({
            message : "Invalid Credentials"
        });
    };

    if(user.role === "teacher" && user.status !== "approved"){
        return res.status(403).json({
            message : "Your account is pending for approval. Please wait for admin approval."
        });
    };

    // token creation 
   const token = generateToken(user._id);



    res.json({
        token,
        user : {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status
        },
        message : "Login successful"
    })

}
catch(error){
    res.status(500).json({error : error.message})
}
};


exports.getme = async (req,res) => {
    try {
        const user = await User.findById(
            req.user.id
        ).select("-password");

        res.status(200).json(user)
    }catch(error){
        res.status(500).json({
                error : error.message
        })
    }
}