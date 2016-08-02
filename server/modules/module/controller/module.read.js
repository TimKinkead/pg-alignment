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
 * MODULE.READ
 * - Read a module.
 */
exports.read = function(req, res) {
	logger.filename(__filename);

	if (!req.query.module) {
		return res.status(400).send({message: '!req.query.module'});
	}
	
	// get modules
	Module.findById(req.query.module)
		.exec(function(err, moduleDoc) {
			if (err) { 
				err = new Error(err);
				error.log(err); 
				return res.status(500).send(err);
			}
			
			// return module
			return res.status(200).send(moduleDoc);
		});
};