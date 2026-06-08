const Course = require("../../models/Courses/course");
const uploadToCloudinary = require("../../utils/uploadTocloudinary");

exports.addCourse = async (req,res) => {

    try{
        const {title,description,createdBy} = req.body;

        const thumbnail = req.file;

        const uploadedImage = await uploadToCloudinary(thumbnail.buffer,"course-thumbnails");

        const newCourse = await Course.create({
            title,
            description,
            thumbnail: uploadedImage.secure_url,
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