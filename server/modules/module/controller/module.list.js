'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

var mongoose = require('mongoose'),
	Module = mongoose.model('Module'),

//----------------------------------------------------------------------------------------------------------------------
// Controllers
	
	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * MODULE.LIST
 * - List all modules.
 */
exports.list = function(req, res) {
	logger.filename(__filename);
	
	// get modules
	Module.find({})
		.exec(function(err, moduleDocs) {
			if (err) { 
				err = new Error(err);
				error.log(err); 
				return res.status(500).send(err);
			}
			
			// return modules
			return res.status(200).send(moduleDocs);
		});
};