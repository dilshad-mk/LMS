const Session = require("../../models/Courses/session");

exports.updateSession = async (req,res) => {

    try{

        const{id} = req.params;

        const session = await Session.findById(id);

        if(!session){
            return res.status(404).json({
                success: false,
                message : "session not found!"
            });
        }
        
                    const updatedSession =await Session.findByIdAndUpdate(
                        id,
                        req.body,
                        {
                            new: true,
                            runValidators: true
                        }
                    )

        res.status(200).json({
            success: true,
            message :"Session updated"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error :error.message || "server error"
        })
    }
}