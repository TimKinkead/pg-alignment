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
 * MODULE.SUMMARY
 * - Get summary for modules.
 */
exports.summary = function(req, res) {
	logger.filename(__filename);

	var summary = {};

	var cnt;
	function checkDone() {
		cnt -= 1;
		if (cnt === 0) {
			return res.status(200).send(summary);
		}
	}

	function countModules(field, query) {
		query['ldcDbData.id'] = {$exists: true};
		Module.count(query, function(err, qty) {
			if (err) {
				error.log(new Error(err));
			}
			if (qty || qty === 0) {
				summary[field] = qty;
			}
			checkDone();
		});
	}

	// start
	cnt = 3;
	countModules('manualScores', {manualScores: {$exists: true}});
	countModules('predictedScores', {predictedScores: {$exists: true}});
	countModules('noScores', {manualScores: {$exists: false}, predictedScores: {$exists: false}});
};