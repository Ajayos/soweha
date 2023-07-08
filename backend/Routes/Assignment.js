const express = require("express");
const router = express.Router();
const Admin = require("../controllers/DepartmentController");
const Middleware = require("../middleware/authMiddleware");


// router.get("/admin", Middleware, Admin.getAdmins);

module.exports = router;