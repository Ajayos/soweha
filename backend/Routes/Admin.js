const express = require("express");
const router = express.Router();
const Admin = require("../controllers/AdminController");

// Route: POST /admin/v1/
router.post("/", Admin.login);

// Route: POST /admin/v1/new
router.post("/new", Admin.createAccount);

// router.post("/dashboard", protectAdmin, Admin.dashBoard);

module.exports = router;