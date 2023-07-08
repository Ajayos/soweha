const asyncHandler = require("express-async-handler");
const {
	Departments,
	getDepartment,
	getDepartments,
} = require("../Services/DepartmentServices");

// Get all departments list
exports.getDepartmentsList = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await Departments();
		return res.status(status).json({
			error: error,
			message: message,
			data: data,
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: "Internal server error",
			data: undefined,
		});
	}
});

// Get all departments
exports.getDepartments = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await getDepartments();
		return res.status(status).json({
			error: error,
			message: message,
			data: data,
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: "Internal server error",
			data: undefined,
		});
	}
});

// Get a single department
exports.getDepartment = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await getDepartment(req.params);
		return res.status(status).json({
			error: error,
			message: message,
			data: data,
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: "Internal server error",
			data: undefined,
		});
	}
});
