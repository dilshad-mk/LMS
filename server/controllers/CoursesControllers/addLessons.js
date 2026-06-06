const Lesson = require("../../models/Courses/lesson");

exports.addLesson = async (req,res) => {

    try{
        const {title,content,videoUrl,sessionId} = req.body;

        const newLesson = await Lesson.create({
            title,
            content,
            videoUrl,
            sessionId
        });

        res.status(200).json({
            message : "lesson added succesFully", newLesson
        });
    }
    catch(error){
            res.status(500).json({
                error : error.message || "server error"
            })
    }
};