const {getme} = require("../controllers/user");
const express = require('express');
const protect = require('../middleware/authMiddleware');


const route = express.Router();

route.get("/me",protect,getme);
module.exports = route