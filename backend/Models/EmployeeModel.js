// Import the mongoose package
const mongoose = require("mongoose");

/*
 * Define the employee schema using mongoose.Schema
 * Each field is defined with its type and additional properties
 */
const employeeSchema = new mongoose.Schema(
	{
		// Name field of type String, required
		name: {
			type: String,
			required: true,
		},

		// ID field of type Number, required and unique
		id: {
			type: Number,
			required: true,
			unique: true,
		},

		// Email field of type String, required and unique
		email: {
			type: String,
			required: true,
			unique: true,
		},

		// Phone number field of type String, required and unique
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},

		// Date of joining field of type Date, required
		dateOfJoining: {
			type: Date,
			required: true,
		},

		// Years of experience field of type Number, required
		yearsOfExperience: {
			type: Number,
			required: true,
		},

		// Date of birth field of type String, required
		dob: {
			type: String,
			required: true,
		},

		// Age field of type Number, required
		age: {
			type: Number,
			required: true,
		},

		// Created field of type Date
		created: {
			type: Date,
		},

		// Updated field of type Date with default value Date.now
		updated: {
			type: Date,
			default: Date.now,
		},

		// Role field of type String, with possible values "Employee" or "Manager", default is "Employee"
		role: {
			type: String,
			enum: ["Employee", "Manager"],
			default: "Employee",
		},

		// Department field of type mongoose.Schema.Types.ObjectId, ref "Department" (referencing the Department model)
		department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    }
	},
	{
		// Define the timestamps option to automatically generate 'created' and 'updated' fields
		timestamps: {
			createdAt: "created",
			updatedAt: "updated",
		},
	}
);

// Create the Employee model using the employeeSchema
const Employee = mongoose.model("Employee", employeeSchema);

// Export the Employee model
module.exports = Employee;
