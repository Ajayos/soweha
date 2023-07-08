// Import the mongoose package
const mongoose = require("mongoose");

/*
 * Define the department schema using mongoose.Schema
 * Each field is defined with its type and additional properties
 */
const departmentSchema = new mongoose.Schema(
	{
		// ID field of type Number, required and unique
		id: {
			type: Number,
			required: true,
			unique: true,
		},

		// Name field of type String, required
		name: {
			type: String,
			required: true,
		},

		// Location field of type String, required
		location: {
			type: String,
			required: true,
		},

		// Manager field of type String, required
		manager: {
			type: String,
			required: true,
		},
	}
);

// Create the Department model using the departmentSchema
const Department = mongoose.model("Department", departmentSchema);

// Export the Department model
module.exports = Department;
