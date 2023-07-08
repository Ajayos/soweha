// Import the nodelogger package
const logger = require("@ajayos/nodelogger");

/**
 * Function to setup the logger
 */
async function setupLogger() {
	// Start the logger with the specified configurations
	await logger.start({
		timeZone: "Asia/Kolkata",
		hour: "numeric",
		minute: "numeric",
		hour12: 1,
		filename: "logs/%DATE%.log",
		datePattern: "YYYY-MM/DD",
		zippedArchive: false,
		maxSize: "1g",
		level: "info",
	});
}

// Export the setupLogger function
module.exports = setupLogger;
