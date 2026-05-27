const User = require("../models/user");

exports.registerUser = async (req,res) => {
    try{
        const {username,email,password,role} = req.body;

        if(!username){
            return res.status(400).json({message : "Name required!"});
        };
        if(!email){
            return res.status(400).json({message: "Email is required!"});
        }
        if(!password){
            return res.status(400).json({
                message :"Password required!"
            })
        };

        if(!role){
            return res.status(400).json({message : "Please select a role!"})
        };

        if(!email || !password || !role || !username){
            return res.status(400).json({message : "All fields required!"})
        };

        // create user
        const newUser = await User.create({username,email,password,role});

        res.status(200).json({
            message : "User registerd successfully!",
            newUser
        });
    }catch(error){
        res.status(500).json({message : "Server error!", error : error.message})
    }
}