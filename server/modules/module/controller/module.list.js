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

	var query = {'ldcDbData.id': {$exists: true}},
		sort = {'ldcDbData.id': 1},
		skip = (req.query.skip) ? Number(req.query.skip) : 0,
		limit = (req.query.limit) ? Number(req.query.limit) : 100;

	switch(req.query.filterBy) {
		case 'manual scores':
			query.manualScores = {$exists: true};
			break;
		case 'predicted scores':
			query.predictedScores = {$exists: true};
			break;
		case 'no scores':
			query.manualScores = {$exists: false};
			query.predictedScores = {$exists: false};
			break;
	}

	// get modules
	logger.dash('getting modules');
	Module.find(query)
		.select('ldcDbData.id ldcDbData.name ldcDbData.uuid manualScores predictedScores')
		.sort(sort)
		.skip(skip)
		.limit(limit)
		.exec(function(err, moduleDocs) {
			if (err) { 
				err = new Error(err);
				error.log(err); 
				return res.status(500).send(err);
			}
			
			// return modules
			logger.arrow('returning '+moduleDocs.length+' modules');
			return res.status(200).send(moduleDocs);
		});
};