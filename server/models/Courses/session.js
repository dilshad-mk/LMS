const mongoose = require("mongoose");



const sessionSchema = new mongoose.Schema({

   title : {
    type : String,
    trequired : true
   },
   
   courseId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Course"
   },
   sessionOrder : {
    type : Number,
    unique: true,
    required : true
}
});

module.exports = mongoose.model("Session", sessionSchema);