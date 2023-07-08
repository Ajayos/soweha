const { Admin } = require("../Models");
const isEqual = require("../lib/isEqual");


/**
 * Validates and protects an admin's access based on provided data.
 * @param {Object} data - The data object containing admin information.
 * @param {string} data.id - The admin's ID.
 * @param {string} data.password - The admin's password.
 * @returns {Object} - The result of the protection process.
 */
exports.protectAdmin = async (data) => {
  try {
    // Destructure the data object to get the required properties
    const { id, password } = data;

    // Find the admin based on the decoded id
    const admin = await Admin.findById(id);

    if (!admin) {
      // Admin not found
      return {
        status: 404,
        message: "Admin not found!",
        error: true,
        data: undefined,
      };
    }

    if (!isEqual(admin.password, password)) {
      // Password doesn't match
      return {
        status: 401,
        message: "Not authorized, token failed!",
        error: true,
        data: undefined,
      };
    }

    // Admin access is valid
    return {
      status: 200,
      message: undefined,
      error: false,
      data: admin,
    };
  } catch (error) {
    // Internal server error
    return {
      status: 500,
      error: true,
      message: "Internal server error",
      data: undefined,
    };
  }
};