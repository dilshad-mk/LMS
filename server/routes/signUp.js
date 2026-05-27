const {registerUser} = require("../controllers/user");

const express = require("express");
const route = express.Router();

route.post("/signup", registerUser);

module.exports = route; 