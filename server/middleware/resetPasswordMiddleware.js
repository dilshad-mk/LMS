const User = require("../models/user");
const jwt = require("jsonwebtoken");


exports.resetPasswordProtect = async (req,res,next) => {
    try{

        // const {password} = req.body;
        const token = req.headers.authorization;

        if(!token) {
            return res.status(401).json({
                message : "No token provided, authorization denied"
            });
        }

        const tokenwithoutBearer = token.split(" ")[1];

        const decode = jwt.verify(
            tokenwithoutBearer,
            process.env.JWT_SECRET
        );
        
        if (decode.purpose !== "reset-password") {
    return res.status(401).json({
        message: "Invalid token purpose"
    });
}
        req.user = decode
       
            next();

    }catch(error){
        res.status(401).json({message : "Invalid token",error : error.message});
        
    
    }

}


