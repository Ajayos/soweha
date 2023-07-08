// Import the necessary models and schemas
const connectDB = require("./Database");
const Admin = require("./AdminModel");
const Employee = require("./EmployeeModel");
const Department = require("./DepartmentModel");
const Assignment = require("./AssignmentModel");

// Export the models and schemas
module.exports = {
	connectDB, // User model for managing user data
    Admin, // Admin model for managing admin data
    Employee, // Employee model for managing employee data
    Department, // Department model for managing department data
    Assignment, // Assignment model for managing assignment data
};
