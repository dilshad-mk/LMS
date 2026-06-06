
const mongoose = require("mongoose");


const courseScheam = new mongoose.Schema({
   title : {
    type: String,
    required :true

   }, 

   description : {
        type : String,
        required : true
   },
   thumbnail : {
    type :String,
    required : true
   },

   createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref :"user"
   }
});

module.exports = mongoose.model("Course", courseScheam)