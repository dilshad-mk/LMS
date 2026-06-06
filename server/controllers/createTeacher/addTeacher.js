const User = require("../../models/user");
const bcrypt = require("bcrypt");

exports.addTeacher = async (req,res) => {

    try {

        const {username,email,password,role} = req.body;

  
        const hashedPassword = await bcrypt.hash(password,10);

        const newTeacher = await User.create({
            username,
            email,
            password : hashedPassword,
            role
        });
        res.status(200).json({
            success : true, message : "Teacher where added ",
        });
    }
    catch(error){
        res.status(500).json({
            error :error.message || "server error"
        })
    }
}