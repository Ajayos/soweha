/**
 *
 * @project : SOWEHA
 * @version : 1.0.0
 * @link : https://github.com/Ajayos/soweha
 * @author : Ajay o s
 * @created : 8-7-2023
 * @modified : 8-7-2023
 * @editor : Ajayos, Akash, nimisha, sabiya
 * @file : errorHandler.js
 * @path : /middleware/errorHandler.js
 *
 * GitHub Repository: https://github.com/Ajayos/soweha
 *
 * All rights reserved. (C) 2023 SOWEHA
 */

/**
 * Handles errors and sends an appropriate response.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
	// Determine the status code based on the current response status
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	// Set the response status code
	res.status(statusCode);

	// Send a JSON response with the error message and details
	res.json({
		message: "Internal Server Error",
		error: err.message,
	});
};

// Export the errorHandler function to be used in other modules
module.exports = errorHandler;
