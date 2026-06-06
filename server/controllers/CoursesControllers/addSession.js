const Session = require ("../../models/Courses/session");

exports.addSession = async (req,res) => {

    try{
        const {title,courseId} = req.body;

        const newSession = await Session.create({
            title,
            courseId

        });
        res.status(200).json({
            message :"session added succesfully"
        })

    }
    catch(error){
        res.status(500).json({
            error : error.message || "server error"
        })
    }
}