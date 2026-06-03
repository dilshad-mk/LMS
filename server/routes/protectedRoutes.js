const {getme,resetPswd} = require("../controllers/user");
const express = require('express');
const protect = require('../middleware/authMiddleware');
const {resetPasswordProtect} = require("../middleware/resetPasswordMiddleware")


const route = express.Router();

route.get("/me",protect,getme);
route.post("/reset-pswd", resetPasswordProtect,resetPswd)
module.exports = route