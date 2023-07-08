// Import dependencies
const express = require("express");
const router = express.Router();

// Import individual router modules
const Department = require("./Department");

// Set up routes
router.use("/department/v1/", Department);

// Export router
module.exports = router;
