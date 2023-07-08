const { Employee } = require("../Models");

/**
 * Get all employees with their respective departments.
 * @returns {Object} - The result of the operation.
 */
exports.Employees = async () => {
	try {
		// Retrieve all employees from the Employee model
		const employees = await Employee.find().populate("department");

		// Return the employees as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: employees,
		};
	} catch (error) {
		// Handle any errors that occur during the operation
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Get a single employee with its respective department.
 * @returns {Object} - The result of the operation.
 * @param {String} id - The ID of the employee to retrieve.
 */
exports.getEmployee = async ({ id }) => {
	try {
		// Find the employee by ID
		const employee = await Employee.findById(id).populate("department");

		if (!employee) {
			// Employee not found
			return {
				status: 404,
				error: true,
				message: "Employee not found",
				data: undefined,
			};
		}

		// Return the employee as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: employee,
		};
	} catch (error) {
		// Handle any errors that occur during the operation
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Edit an employee.
 * @returns {Object} - The result of the operation.
 * @param {String} id - The ID of the employee to edit.
 * @param {Object} employee - The employee data to update.
 * @param {String} employee.name - The employee's name.
 * @param {String} employee.email - The employee's email.
 * @param {String} employee.phoneNumber - The employee's phone number.
 * @param {String} employee.dob - The employee's date of birth.
 * @param {String} employee.age - The employee's department Age.
 */
exports.editEmployee = async ({ id, employee }) => {
	try {
		// Find the employee by ID.
		const employeeToEdit = await Employee.findById(id);

		if (!employeeToEdit) {
			// Employee not found
			return {
				status: 404,
				error: true,
				message: "Employee not found",
				data: undefined,
			};
		}

		// Update the employee with the new data
		employeeToEdit.name = employee.name;
		employeeToEdit.email = employee.email;
		employeeToEdit.phoneNumber = employee.phoneNumber;
		employeeToEdit.dob = employee.dob;
		employeeToEdit.age = employee.age;

		// Save the updated employee
		await employeeToEdit.save();

		// Return the updated employee data as the result of the operation
		const updatedEmployee = await Employee.findById(id).populate("department");

		if (!updatedEmployee) {
			// Employee not found
			return {
				status: 404,
				error: true,
				message: "Employee not found",
				data: undefined,
			};
		}

		// Return the updated employee as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: updatedEmployee,
		};
	} catch (error) {
		// Handle any errors that occur during the operation
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Delete an employee.
 * @returns {Object} - The result of the operation.
 */
exports.deleteEmployee = async ({ id }) => {
	try {
		// Find the employee by ID
		const employeeToDelete = await Employee.findById(id);

		if (!employeeToDelete) {
			// Employee not found
			return {
				status: 404,
				error: true,
				message: "Employee not found",
				data: undefined,
			};
		}

		// Delete the employee
		await employeeToDelete.remove();

		// Return the deleted employee as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: undefined,
		};
	} catch (error) {
		// Handle any errors that occur during the operation
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Add an employee.
 * @returns {Object} - The result of the operation.
 * @param {Object} employee - The employee data to add.
 * @param {String} employee.name - The employee's name.
 * @param {String} employee.email - The employee's email.
 * @param {String} employee.phoneNumber - The employee's phone number.
 * @param {String} employee.dob - The employee's date of birth.
 * @param {String} employee.age - The employee's department Age.
 * @param {String} employee.department - The employee's department.
 * @param {String} employee.yearsOfExperience - The employee's years of experience.
 * @param {String} employee.dateOfJoining - The employee's date of joining.
 */
exports.addEmployee = async ({ employee }) => {
	try {
		// Create a new employee
		const newEmployee = new Employee({
			name: employee.name,
			email: employee.email,
			phoneNumber: employee.phoneNumber,
			dob: employee.dob,
			age: employee.age,
			department: employee.department,
			yearsOfExperience: employee.yearsOfExperience,
			dateOfJoining: employee.dateOfJoining,
			created: new Date(),
		});

		// Save the new employee
		await newEmployee.save();

		// Return the new employee as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: newEmployee,
		};
	} catch (error) {
		// Handle any errors that occur during the operation
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Get all employees with role of manager.
 * @returns {Object} - The result of the operation.
 */
exports.getManagers = async () => {
	try {
		// Find all employees with role of manager
		const managers = await Employee.find({ role: "manager" }).populate(
			"department"
		);

		// Return the managers as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: managers,
		};
	} catch (error) {
		// Handle any errors that occur during the operation
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Get all employees with role of employee.
 * @returns {Object} - The result of the operation.
 */
exports.getEmployees = async () => {
	try {
		// Find all employees with role of employee
		const employees = await Employee.find({ role: "employee" }).populate(
			"department"
		);

		// Return the employees as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: employees,
		};
	} catch (error) {
		// Handle any errors that occur during the operation
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Change the department of an employee.
 * @returns {Object} - The result of the operation.
 * @param {ObjectId} employee - The employee ID.
 * @param {ObjectId} department - The department ID.
 */
exports.changeDepartment = async ({ employee, department }) => {
	try {
		// Find the employee by ID
		const employeeToEdit = await Employee.findById(employee);

		if (!employeeToEdit) {
			// Employee not found
			return {
				status: 404,
				error: true,
				message: "Employee not found",
				data: undefined,
			};
		}

		// Update the employee with the new data
		employeeToEdit.department = department;

		// Save the updated employee
		await employeeToEdit.save();

		// Return the updated employee data as the result of the operation
		const updatedEmployee = await Employee.findById(employee).populate(
			"department"
		);

		return {
			status: 200,
			error: false,
			message: "Success",
			data: updatedEmployee,
		};
	} catch (error) {
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Promote an employee.
 * @returns {Object} - The result of the operation.
 * @param {ObjectId} id - The employee ID.
 */
exports.PromoteEmployee = async ({ id }) => {
	try {
		const employee = await Employee.findById(id);
		if (!employee) {
			return {
				status: 404,
				error: true,
				message: "Employee not found",
				data: undefined,
			};
		}
		if (employee.yearsOfExperience >= 5) {
			employee.role = "manager";
			await employee.save();
			return {
				status: 200,
				error: false,
				message: "Success",
				data: employee,
			};
		} else {
			return {
				status: 400,
				error: true,
				message: "Not eligible",
				data: undefined,
			};
		}
	} catch (error) {
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};

/**
 * Demote an employee.
 * @returns {Object} - The result of the operation.
 * @param {ObjectId} id - The employee ID.
 */
exports.DemoteEmployee = async ({ id }) => {
	try {
		const employee = await Employee.findById(id);
		if (!employee) {
			return {
				status: 404,
				error: true,
				message: "Employee not found",
				data: undefined,
			};
		}
		if (employee.role === "manager") {
			employee.role = "employee";
			await employee.save();
			return {
				status: 200,
				error: false,
				message: "Success",
				data: employee,
			};
		} else {
			return {
				status: 400,
				error: true,
				message: "Not eligible",
				data: undefined,
			};
		}
	} catch (error) {
		return {
			status: 500,
			error: true,
			message: "Internal server error",
			data: error,
		};
	}
};
