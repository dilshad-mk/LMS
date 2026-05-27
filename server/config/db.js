const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("DB connected successfully");

    } catch (error) {

        console.log("DB connection failed");

        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

module.exports = connectDB;