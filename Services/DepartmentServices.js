const { Department, Employee } = require("../Models");
const { v4: uuid } = require("uuid");

/**
 * Get all departments with their respective employees.
 * @returns {Object} - The result of the operation.
 */
exports.Departments = async () => {
	try {
		// Retrieve all departments from the Department model
		const departments = await Department.find();

		// Return the departments as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: departments,
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
 * Get a single department with its respective employees.
 * @returns {Object} - The result of the operation.
 */
exports.getDepartment = async ({ id }) => {
	try {
		// Find the department by ID
		const department = await Department.findById(id);

		// Find all employees that have the department ID in their department field
		const employees = await Employee.find({ department: id });

		// Create an object with the department and employees
		const departmentWithEmployees = {
			department: department,
			employees: employees,
		};

		if (!department) {
			// Department not found
			return {
				status: 404,
				error: true,
				message: "Department not found",
				data: undefined,
			};
		}

		// Return the department with its employees as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: departmentWithEmployees,
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
 * Get all departments with their respective employees.
 * @returns {Object} - The result of the operation.
 */
exports.getDepartments = async () => {
	try {
		// Retrieve all departments from the Department model
		const departments = await Department.find();

		// Create an array to store department objects with their respective employees
		const departmentWithEmployees = [];

		// Iterate over each department and find the associated employees
		for (let i = 0; i < departments.length; i++) {
			// Find employees with the department ID in their department field
			const employees = await Employee.find({ department: departments[i]._id });

			// Create a department object with the department and employees
			const departmentObject = {
				department: departments[i],
				employees: employees,
			};

			// Push the department object to the departmentWithEmployees array
			departmentWithEmployees.push(departmentObject);
		}

		// Return the departmentWithEmployees array as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Success",
			data: departmentWithEmployees,
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
 * Create a new department.
 * @param {Object} data - The department data.
 * @returns {Object} - The result of the operation.
 */
exports.createDepartment = async (data) => {
	try {
		if (!data.name || !data.location || !data.manager) {
			return {
				status: 400,
				error: true,
				message: "Missing required fields",
				data: undefined,
			};
		}
		// Create a new department using the Department model
		const department = new Department({
			id: uuid(),
			name: data.name,
			location: data.location,
			manager: data.manager,
		});

		// Save the new department
		await department.save();

		// Return the department as the result of the operation
		return {
			status: 201,
			error: false,
			message: "Department created",
			data: department,
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
 * Update a department.
 * @param {Object} data - The department data.
 * @returns {Object} - The result of the operation.
 */
exports.updateDepartment = async (data) => {
	try {
		// Find the department by ID and update it
		const department = await Department.findById(data.id);

		if (!department) {
			// Department not found
			return {
				status: 404,
				error: true,
				message: "Department not found",
				data: undefined,
			};
		}

		// Update the department
		department.name = data.name;
		department.location = data.location;
		department.manager = data.manager;

		// Save the updated department
		await department.save();

		// Return the department as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Department updated",
			data: department,
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
 * Delete a department.
 * @param {Object} data - The department data.
 * @returns {Object} - The result of the operation.
 */
exports.deleteDepartment = async ({ id }) => {
	try {
		// Find the department by ID and delete it
		const department = await Department.findByIdAndDelete(id);

		if (!department) {
			// Department not found
			return {
				status: 404,
				error: true,
				message: "Department not found",
				data: undefined,
			};
		}

		// Return the department as the result of the operation
		return {
			status: 200,
			error: false,
			message: "Department deleted",
			data: department,
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
