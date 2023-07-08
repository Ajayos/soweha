const asyncHandler = require("express-async-handler");
const {
	Departments,
	getDepartment,
	getDepartments,
} = require("../Services/DepartmentServices");


/*
 * This function gets all departments list from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
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

/*
 * This function gets all departments from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
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

/*
 * This function gets a single department from the database.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves with the response data.
 */
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
