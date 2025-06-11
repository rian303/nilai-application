const mongoose = require("mongoose");
require("dotenv").config();


const getConnection = async () => {
  console.log("[+] Trying to connecting to Database");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[+] Connected to MongoDB");
  } catch (error) {
    console.error("[-] MongoDB connection error:", error);
    console.log("Reconnect...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await getConnection(); // Recursively call connectToMongoDB
  }
};

module.exports = { getConnection };
