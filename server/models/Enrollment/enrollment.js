const mongoose = require ("mongoose");

const enrollmentSchema = new mongoose.Schema({
    studentId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },

    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true
    },

    assaignedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        // required: true
    },

    assaignedAt : {
            type :Date,
            default : Date.now
    }

});

module.exports = mongoose.model("Enrollment", enrollmentSchema)

