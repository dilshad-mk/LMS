const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.adminMiddleware = async (req,res,next) => {

    try {

        const token = req.headers.authorization;

        if(!token){
            res.status(401).json({
                message : "No token provided, Autharizaion denied "
            });
        };

        const tokenwithoutBearer = token.split(" ")[1];

        const decode = jwt.verify(
            tokenwithoutBearer,
            process.env.JWT_SECRET
        );

        const userType = await User.findById(decode.id);
       

        if(userType.role !== "admin"){
                res.status(401).json({
                    message : "Only admin can create teacher"
                });
        };

        next();
    }

    catch(error){
        res.status(500).json({
            error : error.message || "server error"
        })
    }
}