const { Admin, Department, Employee } = require("../Models");
const { encode } = require("../lib/JWT");
const bcrypt = require("bcryptjs");

/**
 * Perform admin login with provided username and password.
 * @param {Object} data - The data object containing username and password.
 * @param {string} data.username - The admin's username.
 * @param {string} data.password - The admin's password.
 * @returns {Object} - The result of the login process.
 */
exports.login = async ({ username, password }) => {
	try {
		// Check if an admin exists with the provided username
		const check = await Admin.findOne({ username: username });

		if (!check) {
			// Admin not found
			return {
				status: 404,
				error: true,
				message: "Admin not found",
				data: undefined,
			};
		}

		// Compare the provided password with the hashed password in the database
		const isMatch = await bcrypt.compare(password, check.password);

		if (isMatch) {
			// Password matches, generate a token
			const token = encode({
				id: check._id,
				password: check.password,
				username: username,
			});

			// Return the token as the result of the login process
			return {
				status: 200,
				error: false,
				message: "Success",
				data: { token, username, pic: check.pic, id: check._id},
			};
		} else {
			// Invalid password
			return {
				status: 401,
				error: true,
				message: "Invalid password",
				data: undefined,
			};
		}
	} catch (error) {
		// Handle any errors that occur during the login process
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Create an account with the provided account information.
 * @param {Object} accountInfo - The account information object.
 * @param {string} accountInfo.username - The username for the account.
 * @param {string} accountInfo.password - The password for the account.
 * @param {string} accountInfo.pic - The profile picture for the account.
 * @returns {Object} - The result of the account creation process.
 */
exports.createAccount = async (accountInfo) => {
	try {
		// Destructure the accountInfo object to get the required properties
		const { username, password, pic } = accountInfo;

		// Validate the account information
		if (!username || !password || !pic) {
			return {
				status: 400,
				error: true,
				message: "Missing account information",
				data: undefined,
			};
		}

		// Check if an account with the same username already exists
		const existingAccount = await Admin.findOne({ username: username });
		if (existingAccount) {
			return {
				status: 409,
				error: true,
				message: "Account with the same username already exists",
				data: undefined,
			};
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new account object with the account information
		const newAccount = new Admin({
			username: username,
			password: hashedPassword,
			pic: pic,
		});

		// Save the new account in the database
		await newAccount.save();

		// Return the new account as the result of the account creation process
		return {
			status: 201,
			error: false,
			message: "Account created successfully",
			data: newAccount,
		};
	} catch (error) {
		console.log(error);
		// Handle any errors that occur during the account creation process
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};
/**
 * Get all dashboard data
 * @returns {Object} - The result of the dashboard data retrieval.
 */
exports.getDashBoardData = async () => {
	try {
		// Get all departments
		const departments = await Department.find();

		// Get all employee
		const employee = await Employee.find({ role: "Employee" });

		// Get all employees
		const employees = await Employee.find();

		// Get all managers
		const managers = await Employee.find({ role: "Manager" });

		// Return the dashboard data
		return {
			status: 200,
			error: false,
			message: "Success",
			data: { departments: departments.length, employee: employee.length, employees: employees.length, managers: managers.length },
		};
	} catch (error) {
		// Handle any errors that occur during the process
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};
