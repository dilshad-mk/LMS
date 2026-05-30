const {registerUser,loginUser,getUser} = require("../controllers/user");

const express = require("express");
const route = express.Router();

route.post("/signup", registerUser);
route.get("/login", loginUser);
route.get("/get/:id", getUser);

module.exports = route; 