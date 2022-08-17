const mongoose = require("mongoose");

// Connecting to the database
async function ConnectToMongoDB() {
  try {
    await mongoose
      .connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Successfully connected to the database");
      });
  } catch (error) {
    console.log("Error: " + error);
  }
}

module.exports = { ConnectToMongoDB };
