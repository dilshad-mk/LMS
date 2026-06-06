const Course = require("../../models/Courses/course");

exports.addCourse = async (req,res) => {

    try{
        const {title,description,thumbnail,createdBy} = req.body;

        const newCourse = await Course.create({
            title,
            description,
            thumbnail,
            createdBy
        });

        res.status(200).json({
            message : "Course added SuccesFully!",
            newCourse
        });
    }
    catch(error){
        res.status(500).json({
            error  :error.message || "server error"
            
        })
    }
}