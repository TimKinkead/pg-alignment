'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

var mongoose = require('mongoose'),
	Indicator = mongoose.model('Indicator'),

//----------------------------------------------------------------------------------------------------------------------
// Controllers
	
	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * INDICATOR.LIST
 * - List all indicators.
 */
exports.list = function(req, res) {
	logger.filename(__filename);

	// get indicators
	Indicator.find({})
		.exec(function(err, indicatorDocs) {
			if (err) { 
				err = new Error(err);
				error.log(err); 
				return res.status(500).send(err);
			}
			
			// return indicators
			return res.status(200).send(indicatorDocs);
		});
};