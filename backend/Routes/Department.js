const express = require("express");
const router = express.Router();
const Department = require("../controllers/DepartmentController");
const Middleware = require("../middleware/authMiddleware");

// Route: GET /department/v1/
router.get("/", Department.getDepartmentsList);

// Route: GET /department/v1/all
router.get("/all", Middleware, Department.getDepartments);

// Route: GET /department/v1/:id
router.get("/:id", Middleware, Department.getDepartment);

// Route: POST /department/v1/
router.post("/", Middleware, Department.createDepartment);

// Route: PUT /department/v1/:id
router.put("/:id", Middleware, Department.updateDepartment);

// Route: DELETE /department/v1/:id
router.delete("/:id", Middleware, Department.deleteDepartment);

module.exports = router;