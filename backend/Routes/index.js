// Import dependencies
const express = require("express");
const router = express.Router();

// Import individual router modules
const Department = require("./Department");
const Employee = require("./Employee");

// Set up routes
router.use("/department/v1/", Department);
router.use("/employee/v1/", Employee);

// Export router
module.exports = router;
