const {getme,resetPswd} = require("../controllers/user");
const express = require('express');

// middleware imports 
const protect = require('../middleware/authMiddleware');
const {resetPasswordProtect} = require("../middleware/resetPasswordMiddleware");
const {adminMiddleware} =require("../middleware/adminMiddleware");
const {teacherMiddleware} =require("../middleware/teacherMiddleware");
const upload = require("../middleware/imageUpload");

// controllers import
const {addCourse} = require("../controllers/CoursesControllers/addCourse");
const {addLesson} =require ("../controllers/CoursesControllers/addLessons");
const {addSession} = require("../controllers/CoursesControllers/addSession");
const {enrollCourse} = require("../controllers/Enrolement/enrollCourse");
const {addTeacher} =require("../controllers/createTeacher/addTeacher");
const {updateSession} =require("../controllers/CoursesControllers/updateSession");
const {deleteSession} = require("../controllers/CoursesControllers/deleteSession");
const {deleteLesson} = require("../controllers/CoursesControllers/deleteLesson");
const {updateLesson} = require("../controllers/CoursesControllers/updateLesson");
const {updateStudentProgress} = require("../controllers/studentProgress/studentProgress")
const {getUserCourse} = require("../controllers/getCourseDeatails/getMyCourse")

const route = express.Router();

// auth-----------------
route.get("/me",protect,getme);
route.post("/reset-pswd", resetPasswordProtect,resetPswd);

// admin actions ---------------
route.post("/addCourse",adminMiddleware,upload.single("thumbnail"),addCourse);
route.post("/addSession",adminMiddleware,addSession);
route.post("/addLesson",adminMiddleware,addLesson);
route.post("/addTeacher",adminMiddleware,addTeacher);
route.put("/updateSession/:id",adminMiddleware,updateSession);
route.delete("/deleteSession/:id",adminMiddleware,deleteSession);
route.delete("/deleteLesson/:id",adminMiddleware,deleteLesson);
route.put("/updateLesson/:id",adminMiddleware,updateLesson);

// teacher action -------
route.post("/enrollCourse",teacherMiddleware,enrollCourse);

// progress updation 
route.post("/updateStudentProgress",protect,updateStudentProgress);

//get course data
route.get("/getUserCourse/:courseId",protect,getUserCourse);


module.exports = route