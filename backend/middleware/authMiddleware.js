/**
 *
 * @project : SOWEHA
 * @version : 1.0.0
 * @link : https://github.com/Ajayos/soweha
 * @author : Ajay o s
 * @created : 8-7-2023
 * @modified : 8-7-2023
 * @editor : Ajayos, Akash, nimisha, sabiya
 * @file : authMiddleware.js
 * @path : /middleware/authMiddleware.js
 *
 * GitHub Repository: https://github.com/Ajayos/soweha
 *
 * All rights reserved. (C) 2023 SOWEHA
 */

// import
const asyncHandler = require("express-async-handler");
const { protectUser, protectAdmin } = require("../Services/authServices");
const { decode } = require("../lib/JWT");

// Authentication middleware for users
exports.protectUser = asyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];

			// Decode the token to get the user id, email, and hashed password
			const { data: data_, error: error_ } = await decode(token);
			if (error_) {
				return res.status(401).json({
					error: true,
					message: data_.message,
				});
			}
			const { id, password } = data_;

			const { status, message, error, data } = await protectUser({
				id,
				password,
				token,
			});

			if (error) {
				return res.status(status).json({ error: true, message: message });
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

// Authentication middleware for admins
exports.protectAdmin = asyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];

			// Decode the token to get the user id, email, and password
			const { id, email, password } = await decode(token);

			const { status, message, error, data } = await protectAdmin(
				id,
				password,
				token
			);

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
