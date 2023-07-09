/**
 *
 * @project : SOWEHA
 * @version : 1.0.0
 * @link : https://github.com/Ajayos/soweha
 * @author : Ajay o s
 * @created : 8-7-2023
 * @modified : 8-7-2023
 * @editor : Ajayos, Akash, nimisha, sabiya
 * @file : index.js
 * @path : /middleware/index.js
 *
 * GitHub Repository: https://github.com/Ajayos/soweha
 *
 * All rights reserved. (C) 2023 SOWEHA
 */

const filename = "index.js";
const errorHandler = require("./errorHandler");
const authMiddleware = require("./authMiddleware");

module.exports = {
	errorHandler,
	authMiddleware,
};
