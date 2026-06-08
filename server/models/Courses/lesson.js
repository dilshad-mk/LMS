const mongoose = require("mongoose");




const lessonSchema = new mongoose.Schema({
title :{
    type : String,
    required : true
},

content : {
    type : String,
    require : true
},

videoUrl : {
    type : String ,
    required : true
},

sessionId  : {
    type :  mongoose.Schema.Types.ObjectId,
    ref : "Session"
},
lessonOrder : {
    type : Number,
    required : true,   
     unique: true,
}

});

module.exports =mongoose.model("Lesson", lessonSchema);