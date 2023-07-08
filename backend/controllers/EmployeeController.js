const asyncHandler = require("express-async-handler");

const {
	Employees,
	getEmployee,
	editEmployee,
	deleteEmployee,
	addEmployee,
	getManagers,
	getEmployees,
	changeDepartment,
	PromoteEmployee,
	DemoteEmployee,
} = require("../Services/EmployeeServices");

/*
 * This function gets all employees list from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.getEmployeesList = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await Employees();
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

/*
 * This function adds a new employee to the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.addEmployee = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await addEmployee(req.body);
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

/*
 * This function edits an existing employee in the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.editEmployee = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await editEmployee(req.body);
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

/*
 * This function deletes an existing employee from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.deleteEmployee = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await deleteEmployee(req.body);
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

/*
 * This function gets all managers from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.getManagers = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await getManagers();
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

/*
 * This function gets all employees from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.getEmployees = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await getEmployees();
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

/*
 * This function gets a single employee from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.getEmployee = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await getEmployee(req.params);
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

/*
 * This function changes the department of an existing employee.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.changeDepartment = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await changeDepartment(req.body);
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

/*
 * This function promotes an existing employee.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.PromoteEmployee = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await PromoteEmployee({
			id: req.body.id,
		});
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

/*
 * This function demotes an existing employee.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
exports.DemoteEmployee = asyncHandler(async (req, res) => {
	try {
		const { status, error, message, data } = await DemoteEmployee({
			id: req.body.id,
		});
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
