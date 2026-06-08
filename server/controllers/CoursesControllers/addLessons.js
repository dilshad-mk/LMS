const Lesson = require("../../models/Courses/lesson");

exports.addLesson = async (req,res) => {

    try{
        const {title,content,videoUrl,sessionId,lessonOrder} = req.body;

        const existingLesson = await Lesson.findOne({
            lessonOrder
            
        })           

            if(existingLesson){
                return res.status(400).json({
                    message : `Lesson order ${lessonOrder} is already belongs to "${existingLesson.title}" chose another order index or update "${existingLesson.title}" order`
                })
            };

        const newLesson = await Lesson.create({
            title,
            content,
            videoUrl,
            sessionId,
            lessonOrder 
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