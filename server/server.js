const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const authRoute = require('./routes/authRoute')

const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api" , authRoute)

app.listen(8080, () =>  {
console.log("http://localhost:8080")
})

