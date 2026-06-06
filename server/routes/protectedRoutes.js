const {getme,resetPswd} = require("../controllers/user");
const express = require('express');

// middleware imports 
const protect = require('../middleware/authMiddleware');
const {resetPasswordProtect} = require("../middleware/resetPasswordMiddleware");
const {adminMiddleware} =require("../middleware/adminMiddleware");
const {teacherMiddleware} =require("../middleware/teacherMiddleware");

// controllers import
const {addCourse} = require("../controllers/CoursesControllers/addCourse");
const {addLesson} =require ("../controllers/CoursesControllers/addLessons");
const {addSession} = require("../controllers/CoursesControllers/addSession");
const {enrollCourse} = require("../controllers/Enrolement/enrollCourse");
const {addTeacher} =require("../controllers/createTeacher/addTeacher");


const route = express.Router();

// auth-----------------
route.get("/me",protect,getme);
route.post("/reset-pswd", resetPasswordProtect,resetPswd);

// admin actions ---------------
route.post("/addCourse",adminMiddleware,addCourse);
route.post("/addSession",adminMiddleware,addSession);
route.post("/addLesson",adminMiddleware,addLesson);
route.post("/addTeacher",adminMiddleware,addTeacher);

// teacher action -------
route.post("/enrollCourse",teacherMiddleware,enrollCourse);

module.exports = route