const asyncHandler = require("express-async-handler");
const Admin = require("../Services/AdminServices");

/**
 * Perform login for an admin with the provided credentials.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The result of the login process.
 */
exports.login = asyncHandler(async (req, res) => {
	try {
		// Call the login function from the Admin service with the request body
		const { status, error, message, data } = await Admin.login(req.body);

		// Return the login result as a JSON response with the appropriate status code
		return res.status(status).json({
			error: error,
			message: message,
			data: data,
		});
	} catch (error) {
		// Handle any errors that occur during the login process
		return res.status(500).json({
			error: true,
			message: "Internal server error",
			data: undefined,
		});
	}
});

/**
 * Create an account with the provided account information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The result of the account creation process.
 */
exports.createAccount = asyncHandler(async (req, res) => {
	try {
		// Call the createAccount function from the Admin service with the request body
		const { status, error, message, data } = await Admin.createAccount(
			req.body
		);

		// Return the account creation result as a JSON response with the appropriate status code
		return res.status(status).json({
			error: error,
			message: message,
			data: data,
		});
	} catch (error) {
		// Handle any errors that occur during the account creation process
		return res.status(500).json({
			error: true,
			message: "Internal server error",
			data: undefined,
		});
	}
});

/**
 * get Dashboard information
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The result of the account creation process.
 */
exports.getDashboard = asyncHandler(async (req, res) => {
	try {
		// Call the createAccount function from the Admin service with the request body
		const { status, error, message, data } = await Admin.getDashBoardData(
			req.body
		);

		// Return the account creation result as a JSON response with the appropriate status code
		return res.status(status).json({
			error: error,
			message: message,
			data: data,
		});
	} catch (error) {
		// Handle any errors that occur during the account creation process
		return res.status(500).json({
			error: true,
			message: "Internal server error",
			data: undefined,
		});
	}
});