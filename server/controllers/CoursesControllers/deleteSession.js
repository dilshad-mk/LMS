const Session = require("../../models/Courses/session");
const Lesson = require("../../models/Courses/lesson");
const Course = require("../../models/Courses/course");


exports.deleteSession = async (req,res) => {

    try{

        const{id} = req.params;

        const session = await Session.findById(id);

        if(!session){
            return res.status(404).json({
                success: false,
                message : "session not found!"
            });
        }

         // delte all lessons of under the session
           await Lesson.deleteMany({
            sessionId : session._id
           });

        //    remove session from course 
        await Course.findByIdAndUpdate(
            session.courseId,
            {
                $pull: {
                    sessons : session._id
                }
            }
        );

        // delete session 
        await Session.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message :"Session deleted"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error :error.message || "server error"
        })
    }
}