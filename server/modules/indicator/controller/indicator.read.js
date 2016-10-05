'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

var mongoose = require('mongoose'),
	Indicator = mongoose.model('Indicator'),
	Module = mongoose.model('Module'),

//----------------------------------------------------------------------------------------------------------------------
// Controllers
	
	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * INDICATOR.READ
 * - Read a indicator.
 */
exports.read = function(req, res) {
	logger.filename(__filename);

	if (!req.query.indicator) {
		return res.status(400).send({message: '!req.query.indicator'});
	}

	var indicator,
		scores,
		errs = [];

	// check done
	var cnt = 2;
	function checkDone() {
		cnt -= 1;
		if (cnt <= 0) {

			// check indicator & score
			if (!indicator && !errs.length) {
				errs.push(new Error('!indicator'));
			} else if (!scores && !errs.length) {
				errs.push(new Error('!scores'));
			}

			// check errs
			if (errs.length) {
				errs.forEach(function(err) {
					error.log(err);
				});
				return res.status(500).send(errs);
			}

			// add scores to indicator
			indicator.manualScores = scores;

			return res.status(200).send(indicator);
		}
	}
	
	// get indicator
	function getIndicator() {
		Indicator.findOne({id: req.query.indicator})
			.lean()
			.exec(function(err, indicatorDoc) {
				if (err) {
					errs.push(new Error(err));
					checkDone();
					return;
				}

				// set indicator
				indicator = indicatorDoc;

				checkDone();
			});
	}

	// get indicator scores
	function getIndicatorScores() {
		var scoreField = 'manualScores.'+req.query.indicator,
			pipeline = [
				{$match: {}},
				{$group: {_id: '$'+scoreField, count: {$sum: 1}}}
			];
		pipeline[0].$match[scoreField] = {$exists: true};
		Module.aggregate(
			pipeline,
			function(err, results) {
				if (err) {
					errs.push(new Error(err));
					checkDone();
					return;
				} else if (!results || !results.length) {
					errs.push(new Error('!results || !results.length'));
					checkDone();
					return;
				}

				// bundle scores
				scores = {total: 0};
				results.forEach(function(result) {
					scores[result._id] = result.count;
					scores.total += result.count;
				});

				checkDone();
			}
		);
	}

	// start
	getIndicator();
	getIndicatorScores();
};