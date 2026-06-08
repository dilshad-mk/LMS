const Session = require ("../../models/Courses/session");

exports.addSession = async (req,res) => {

    try{
        const {title,courseId,sessionOrder} = req.body;

      const existingSession = await Session.findOne({
        sessionOrder
      });

      if(existingSession){
        return res.status(400).json({
            message : `Session order ${sessionOrder} is already belongs to "${existingSession.title}"  chose another order index or update "${existingSession.title}" order`
        })
      }



        const newSession = await Session.create({
            title,
            courseId,
            sessionOrder : sessionCount + 1

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