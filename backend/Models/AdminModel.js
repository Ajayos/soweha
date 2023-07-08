// Import the mongoose package
const mongoose = require("mongoose");

/*
 * Define the admin schema using mongoose.Schema
 * Each field is defined with its type and additional properties
 */
const adminSchema = new mongoose.Schema(
  {
    // Username field of type String, required
    username: {
      type: String,
      required: true,
    },

    // Password field of type String, required
    password: {
      type: String,
      required: true,
    },

    // pic field of type String, required
    pic: {
      type: String,
      required: true,
    }
  },
  {
    // Define the timestamps option to automatically generate 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Create the Admin model using the adminSchema
const Admin = mongoose.model("Admin", adminSchema);

// Export the Admin model
module.exports = Admin;
