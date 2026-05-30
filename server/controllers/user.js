const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")
const User = require("../models/user");
const { generateKey } = require("node:crypto");
const validator = require("validator");


// user registration(sign up) controll  ***need to improve validations*** ....
exports.registerUser = async (req,res) => {
    try{
        const {username,email,password,role} = req.body;

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
        
        if(!email){
            return res.status(400).json({message: "Email is required!"});
        }
        
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
        
   

      


        const hashedPassword = await bcrypt.hash(password ,10);



        // create user
        const newUser = await User.create({username,email,password : hashedPassword,role});

        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role 
        }

        res.status(200).json({
            message : "User registerd successfully!",
            userResponse
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
    }

    // token creation 
   const token = generateToken(user._id);



    res.json({
        token,
        message : "Login successful"
    })

}
catch(error){
    res.status(500).json({error : error.message})
}
};


// get user temp

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};