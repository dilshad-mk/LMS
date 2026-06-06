const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.teacherMiddleware = async (req,res,next) => {

    try{

        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                message: "no token provided, authorization denied"
            });
        };

        const tokenwithoutBearer = token.split(" ")[1];

        const decode = jwt.verify(
            tokenwithoutBearer,
            process.env.JWT_SECRET
        );

        const userType = await User.findById(decode.id);

        if(userType.role !== "teacher"){
            res.status(401).json({
                message : "only teachers do enrollCourses"
            })
        }
        next();
        
    }catch(error){
        res.status(500).json({
            error : error.message || "server error"
        })
    }
}