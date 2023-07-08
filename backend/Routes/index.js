/**
 *
 * @project : SOWEHA
 * @version : 1.0.0
 * @link : https://github.com/Ajayos/soweha
 * @author : Ajay o s
 * @created : 8-7-2023
 * @modified : 8-7-2023
 * @editor : Ajayos, Akash, nimisha, sabiya
 * @file : index.js
 * @path : index.js
 *
 * GitHub Repository: https://github.com/Ajayos/soweha
 *
 * All rights reserved. (C) 2023 SOWEHA
 */

// Import dependencies
const express = require("express");
const router = express.Router();

// Import individual router modules
const adminRouter = require("./adminRouter");
const userRouter = require("./userRouter");

// Set up routes
router.use("/api/v1/admins", adminRouter);
router.use("/api/v1/users", userRouter);

// Export router
module.exports = router;
