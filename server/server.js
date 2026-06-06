const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const authRoute = require('./routes/authRoute');
const protect = require("./routes/protectedRoutes")

const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// non protected ------(auth)-------------
app.use("/api" , authRoute);

// protected routes ----------- dashbord operations and reset pswd etc -----
app.use("/api-protected",protect)

app.listen(8080, () =>  {
console.log("http://localhost:8080")
})

