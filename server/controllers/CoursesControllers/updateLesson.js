const Lesson = require("../../models/Courses/lesson");

exports.updateLesson = async (req,res) => {
    try{

        const {id} = req.params

        const lesson = await Lesson.findById(id);

        if(!lesson){
            return res.status(404).json({message : "Lesson not found"})
        }

        const updatedLesson = await Lesson.findByIdAndUpdate(id,req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            message : "lesson updated"
        })
    }
    catch(error){
     res.status(500).json({
           error : error.message
     })
    }
};