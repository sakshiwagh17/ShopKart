const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log("Error in connecting the mongodb", error);
    process.exit(1);
  }
};
module.exports = connectDB;
