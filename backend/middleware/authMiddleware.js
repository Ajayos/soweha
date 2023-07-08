// import
const asyncHandler = require("express-async-handler");
const { protectAdmin } = require("../Services/authServices");
const { decode } = require("../lib/JWT");

// Authentication middleware for admins
module.exports =  asyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];

			// Decode the token to get the user id, email, and password
			const { id, email, password } = await decode(token);

			const { status, message, error, data } = await protectAdmin(id, password);

			if (error) {
				return res.status(status).json({
					error: true,
					message: message,
				});
			} else {
				next();
			}
		} catch (error) {
			return res.status(401).json({
				error: true,
				message: "Not authorized, token failed",
			});
		}
	} else {
		return res.status(401).json({
			error: true,
			message: "Not authorized, no token",
		});
	}
});
