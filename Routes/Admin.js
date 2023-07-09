const express = require("express");
const router = express.Router();
const Admin = require("../controllers/AdminController");
const Middleware = require("../middleware/authMiddleware");

// Route: POST /admin/v1/
router.post("/", Admin.login);

// Route: POST /admin/v1/new
router.post("/new", Admin.createAccount);

// Route: Get /admin/v1/dashboard
router.get("/dashboard", Middleware, Admin.getDashboard);

module.exports = router;