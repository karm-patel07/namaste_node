const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://badshahvirus:mahakal%402004%40@namaste.pdv9blg.mongodb.net/devTinder",
    );
    console.log("MongoDB connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection error ❌:", err.message);
    throw err;
  }
};

module.exports = connectDB;
