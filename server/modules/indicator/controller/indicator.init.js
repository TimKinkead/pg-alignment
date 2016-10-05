'use strict';

/**
 * Initialize indicators from 'ldc_reviews' spreadsheet.
 * - https://docs.google.com/a/prevagroup.com/spreadsheets/d/1god26dt-brdnmdK61hCjREYGUdhccr09QEmbglCdDf8/edit?usp=sharing
 * - Spreadsheet downloaded as csv and saved to '/data/ldc_reviews - reviews.csv'
 */

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

var mongoose = require('mongoose'),
	Indicator = mongoose.model('Indicator'),

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

	_ = require('lodash'),

//----------------------------------------------------------------------------------------------------------------------
// Controllers

	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * INDICATOR.INIT
 * - Initialize indicators.
 */
exports.init = function(req, res) {
	logger.filename(__filename);

	var indicators = require('../data/indicators'),
		cnt = indicators.length;
	
	function checkDone() {
		cnt -= 1;
		if (cnt === 0) {
			logger.arrow('indicators initialized');
			return res.status(200).send('Indicators initialized.');
		}
	}
	
	// upsert indicators
	logger.dash('upserting indicators');
	indicators.forEach(function(indicator, index) {
		if (indicator && indicator.id) {

			// look for existing indicator
			Indicator.findOne({id: indicator.id})
				.exec(function(err, indicatorDoc) {
					if (err) {
						error.log(new Error(err));
						checkDone();
						return;
					}

					if (indicatorDoc) {
						indicatorDoc = _.extend(indicatorDoc, indicator);
						indicatorDoc.modified = new Date();
					} else {
						indicatorDoc = new Indicator(indicator);
					}

					// save indicator
					indicatorDoc.save(function(err) {
						if (err) {
							error.log(new Error(err));
							checkDone();
							return;
						}

						checkDone();
					});
				});
		}
	});
};