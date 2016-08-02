'use strict';

/**
 * Initialize modules from 'ldc_reviews' spreadsheet.
 * - https://docs.google.com/a/prevagroup.com/spreadsheets/d/1god26dt-brdnmdK61hCjREYGUdhccr09QEmbglCdDf8/edit?usp=sharing
 * - Spreadsheet downloaded as csv and saved to '/data/ldc_reviews - reviews.csv'
 */

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

var mongoose = require('mongoose'),
	Module = mongoose.model('Module'),

//----------------------------------------------------------------------------------------------------------------------
// Dependencies
	
	_ = require('lodash'),
	readline = require('readline'),
	fs = require('fs'),
	parse = require('csv-parse/lib/sync'),
	
//----------------------------------------------------------------------------------------------------------------------
// Controllers
	
	error = require('../../error'),
	logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Methods

/**
 * CONVERT TO JSON
 * - Convert reviews spreadsheet to json.
 * - Return array of json objects.
 * @param clbk - return clbk(err, modules)
 */
function convertToJson(clbk) {

	var modules = [],
		moduleIds = [],
		scores = {},
		headers,
		lineNo = 0;

	// initialize line reader
	var lineReader = readline.createInterface({
		input: fs.createReadStream('data/ldc_reviews - reviews.csv')
	});

	// handle each line of csv file
	lineReader.on('line', function(line) {
		lineNo++;
		if (lineNo%1000 === 0) {
			logger.arrow('reading line '+lineNo);
		}

		// parse line into array
		line = parse(line, {delimiter: ','})[0];

		// grab headers
		if (!headers) {
			headers = line;
			return;
		}

		// construct module object
		var module = {};
		for (var i=0, x=line.length; i<x; i++) {
			module[headers[i]] = line[i];
		}

		if (module.id) {

			// grab manual scores
			if (!scores[module.id]) {
				scores[module.id] = {};
			}
			if (module.indicator_id1 && module.score1) {
				scores[module.id][module.indicator_id1] = module.score1;
			}
			
			// grab ldc id
			var link = module.linktomodule || '',
				modsIndex = link.indexOf('/mods/'),
				ldcId = (modsIndex > -1) ? link.slice(modsIndex+6) : null;
			if (!ldcId) {
				var err = new Error('!ldcId');
				err.module = module;
				error.log(err);
				return;
			}

			// add module to modules
			if (moduleIds.indexOf(module.id) < 0) {
				modules.push({ldcId: ldcId, spreadsheetData: module});
				moduleIds.push(module.id);
			}
		}
	});

	// handle error
	lineReader.on('error', function(err) {
		error.log(new Error(err));
	});

	// done
	lineReader.on('close', function() {

		// add manual scores to modules
		modules.forEach(function(module) {
			if (scores[module.spreadsheetData.id]) {
				module.manualScores = scores[module.spreadsheetData.id];
			}
		});
		
		// done
		logger.arrow('done');
		return clbk(null, modules);
	});
}

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * MODULE.INIT
 * - Initialize modules by adding/updating mongodb modules collection.
 */
exports.init = function(req, res) {
	logger.filename(__filename);

	var savedModules = 0;

	// convert csv to json
	logger.dash('converting csv to json');
	convertToJson(function(err, modules) {
		if (err) {
			error.log(err);
			return res.status(500).send(err);
		}

		// upsert modules
		logger.dash('upserting modules');
		modules.forEach(function(module, index) {

			if (module && module.ldcId) {
				
				// look for existing module
				Module.findOne({ldcId: module.ldcId})
					.exec(function(err, moduleDoc) {
						if (err) { error.log(new Error(err)); return; }

						if (moduleDoc) {
							moduleDoc = _.extend(moduleDoc, module);
							moduleDoc.modified = new Date();
						} else {
							moduleDoc = new Module(module);
						}

						// save module
						moduleDoc.save(function(err) {
							if (err) { error.log(new Error(err)); return; }

							savedModules++;
							if (savedModules%100 === 0) {
								logger.arrow(savedModules+' ('+Math.round((savedModules/modules.length)*100)+'%) - "'+moduleDoc.ldcId+'" module saved');
							}
							if (savedModules >= modules.length) {
								logger.arrow('done');
							}
						});
					});
			}
		});
	});
	
	// done
	return res.status(200).send('Initializing Modules');
};