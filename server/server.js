const express = require("express"); 
require("dotenv").config();
const signUpRoute = require('./routes/signUp')

const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api" , signUpRoute)

app.listen(8080, () =>  {
console.log("http://localhost:8080")
})

