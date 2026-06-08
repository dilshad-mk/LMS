const Lesson = require("../../models/Courses/lesson");

exports.deleteLesson = async (req,res) => {

    try{
        const {id} = req.params;

        const lesson = await Lesson.findById(id);

        if(!lesson){
            return res.status(404).json({
                success : false,
                message : "Lesson not found"
            });

        }

        // delete lesson 
        await Lesson.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "Lesson deleted succesfully"
        })
    }catch(error){
        success : false
        error : error.message
    }
}