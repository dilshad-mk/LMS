const Enrollment = require("../../models/Enrollment/enrollment");

exports.enrollCourse = async (req,res) => {

    try{
        const {studentId,courseId,assaignedBy,assaignedAt} =req.body;

        const enrolledCourse = await Enrollment.create({
            studentId,
            courseId,
            assaignedAt,
            assaignedAt

        });
        res.status(200).json({
            message : "course assaigned", enrolledCourse
        });
    }
    catch(error){
            res.status(500).json({
                error : error.message || "server error"
            })
    }
}