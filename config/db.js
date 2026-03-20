const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notebookDB';
    await mongoose.connect(connectionString);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};
  module.exports=connectDB;
