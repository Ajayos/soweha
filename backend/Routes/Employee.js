const express = require("express");
const router = express.Router();
const Employee = require("../controllers/EmployeeController");
const Middleware = require("../middleware/authMiddleware");

// Route: GET /employee/v1/
router.get("/", Employee.getEmployeesList);

// Route: GET /employee/v1/:id
router.get("/:id", Middleware, Employee.getEmployee);

// Route: POST /employee/v1/
router.post("/", Middleware, Employee.addEmployee);

// Route: PUT /employee/v1/:id
router.put("/:id", Middleware, Employee.editEmployee);

// Route: DELETE /employee/v1/:id
router.delete("/:id", Middleware, Employee.deleteEmployee);

// Route: GET /employee/v1/managers
router.get("/managers", Middleware, Employee.getManagers);

// Route: GET /employee/v1/employee
router.get("/all", Middleware, Employee.getEmployees);

// Route: PUT /employee/v1/:id/promote
router.put("/:id/promote", Middleware, Employee.PromoteEmployee);

// Route: PUT /employee/v1/:id/demote
router.put("/:id/demote", Middleware, Employee.DemoteEmployee);

// Route: PUT /employee/v1/:id/department
router.put("/:id/department", Middleware, Employee.changeDepartment);

module.exports = router;