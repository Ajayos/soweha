// Import the necessary dependencies
const mongoose = require("mongoose");
const { log } = require("@ajayos/nodelogger");
const colors = require("colors");

/**
 * Define a function to connect to the MongoDB database.
 *
 */
const connectDB = async () => {
  const url = process.env.MONGO_URL;
  // Exit the process with a non-zero status code if the URL is not provided
  if (!url) {
    log("MongoDB URL not provided".red.bold);
    process.exit(1);
  }
  // change the <PASSWORD> to real password
  const mongo_url = url.replace("<password>", process.env.MONGO_PASSWORD);

  try {
    // Use Mongoose to connect to the database with the provided URL
    const conn = await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a message indicating that the connection was successful
    log(`MongoDB Connected`.cyan.underline);
  } catch (error) {
    // Log an error message if the connection failed
    log(`Error: ${error.message}`.red.bold);
    // Exit the process with a non-zero status code
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;