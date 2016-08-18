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
		headers,
		ignoreHeaders = ['tsv'],
		lineNo = 0;

	// initialize line reader
	var lineReader = readline.createInterface({
		input: fs.createReadStream('data/modules.csv') // CHANGE FILE PATH & RERUN FOR EACH!!!
	});

	// handle each line of csv file
	lineReader.on('line', function(line) {
		lineNo++;
		if (lineNo%1000 === 0) {
			logger.arrow('reading line '+lineNo);
		}

		// temp limit for testing
		//if (lineNo > 1000) { return; }
		//console.log('lineNo: '+lineNo);

		// parse line into array
		try {
			line = parse(line, {delimiter: ';'})[0];
			if (!line) {
				error.log(new Error('!line at lineNo '+lineNo));
				return;
			}

			// temp print out for testing
			/*if (lineNo === 1 || lineNo === 3) {
				console.log('- '+lineNo+' -');
				console.log(line);
			}*/

		} catch(err) {
			err.message += ' (lineNo '+lineNo+')';
			error.log(err);
			return;
		}

		// grab headers
		if (!headers) {
			headers = line;
			return;
		}

		// construct module object
		var module = {};
		for (var i=0, x=line.length; i<x; i++) {
			if (headers[i] === 'body') {
				try {
					module.body = JSON.parse(line[i]);
				} catch(err) {
					error.log(new Error(err));
					return;
				}
			} else if (ignoreHeaders.indexOf(headers[i]) < 0) {
				module[headers[i]] = line[i];
			}
		}

		// add module to modules
		if (module.uuid) {
			if (moduleIds.indexOf(module.uuid) < 0) {
				modules.push({ldcId: module.uuid, ldcDbData: module});
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
		logger.arrow('done');
		return clbk(null, modules);
	});
}

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * MODULE.INIT
 * - Initialize modules from `data/modules.csv`.
 * - Add/update documents in modules collection with `ldcDbData`.
 */
exports.initFromModules = function(req, res) {
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
		logger.dash('upserting modules ('+modules.length+')');
		//console.log(JSON.stringify(modules[0], null, 4));
		modules.forEach(function(module, index) {

			if (module && module.ldcId) {
				setTimeout(
					function() {
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
									if (savedModules%10 === 0) {
										logger.arrow(savedModules+' ('+Math.round((savedModules/modules.length)*100)+'%) - "'+moduleDoc.ldcId+'" module saved');
									}
									if (savedModules >= modules.length) {
										logger.arrow('done');
									}
								});
							});
					},
					250*index // every 1/2 second
				);
			}
		});
	});

	// done
	return res.status(200).send('Initializing Modules');
};