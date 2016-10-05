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
 * CONVERT MINITASKS CSV TO JSON
 * - Convert `data/scored_module_minitasks` to json.
 * - Return array of json objects.
 * @param clbk - return clbk(err, minitasks)
 */

function convertToJson(clbk) {

	var minitasks = [],
		headers;

	// read csv file
	fs.readFile('data/scored_modules_minitasks.csv', 'utf8', function(err, data) {
		if (err) {
			return clbk(new Error(err));
		}

		// split csv file into lines
		console.log('splitting into lines');
		var lines = data.split('\r\n');

		// convert each line to json
		lines.forEach(function(line, lineIndex) {
			if (lineIndex%100 === 0) {
				console.log(lineIndex+' converting line to json');
			}

			// parse line into array
			var lineArray;
			try {
				lineArray = parse(line, {delimiter: ';'})[0];
				if (!lineArray) {
					error.log(new Error('!lineArray at lineNo '+lineIndex));
					return;
				}
			} catch(err) {
				err.message += ' (lineNo '+lineIndex+')';
				error.log(err);
				return;
			}

			// grab headers
			if (!headers && lineIndex === 0) {
				headers = lineArray;
				return;
			}

			// construct minitask object
			var minitask = {};
			for (var i=0, x=lineArray.length; i<x; i++) {
				minitask[headers[i]] = lineArray[i];
			}

			// add minitask to minitasks
			minitasks.push(minitask);
		});

		return clbk(null, minitasks);
	});
}

function addMinitask(headers, line, lineIndex, clbk) {

	// parse line into array
	var lineArray = null;
	try {
		lineArray = parse(line, {delimiter: ';'})[0];
		if (!lineArray) {
			error.log(new Error('!lineArray at lineNo '+lineIndex));
			return clbk();
		}
	} catch(err) {
		err.message += ' (lineNo '+lineIndex+')';
		err.line = line;
	 	error.log(err);
	 	return clbk();
	}

	// construct minitask object
	var minitask = {};
	for (var i=0, x=lineArray.length; i<x; i++) {
	 	minitask[headers[i]] = lineArray[i];
	}

	// add minitask to module
	if (minitask.id && minitask.mod_id) {

		// get module
		/*Module.findOne({'ldcDbData.id': minitask.mod_id})
			.exec(function(err, moduleDoc) {
				if (err) {
					error.log(new Error(err));
					return clbk();
				} else if (!moduleDoc) {
					error.log(new Error('!moduleDoc'));
					return clbk();
				} else if (!moduleDoc.ldcDbData) {
					error.log(new Error('!moduleDoc.ldcDbData'));
					return clbk();
				}
				console.log('got module');

				// add minitask
				if (!moduleDoc.ldcDbData.minitasks) {
					moduleDoc.ldcDbData.minitasks = [];
				}
				var moduleMinitasks = moduleDoc.ldcDbData.minitasks,
					newMinitask = true;
				moduleMinitasks.forEach(function(modMinitask, index) {
					if (modMinitask && modMinitask.id && modMinitask.id === minitask.id) {
						newMinitask = false;
						moduleMinitasks[index] = minitask;
					}
				});
				if (newMinitask) {
					moduleMinitasks.push(minitask);
				}

				console.log('moduleMinitasks.length = '+moduleMinitasks.length);
				console.log('moduleDoc.ldcDbData.minitasks.length = '+moduleDoc.ldcDbData.minitasks.length);

				// save module
				moduleDoc.save(function(err) {
					if (err) {
						error.log(new Error(err));
						return clbk();
					}
					console.log('module saved');

					return clbk();
				});
			});*/

		// update existing minitask
		Module.update(
			{
				'ldcDbData.id': minitask.mod_id,
				'ldcDbData.minitasks.id': minitask.id
			},
			{
				$set: {'ldcDbData.minitasks.$': minitask}
			},
			function(err) {
				if (err) {
					error.log(new Error(err));
				}

				// add minitask
				Module.update(
					{
						'ldcDbData.id': minitask.mod_id,
						'ldcDbData.minitasks.id': {$ne: minitask.id}
					},
					{
						$push: {'ldcDbData.minitasks': minitask}
					},
					function(err) {
						if (err) {
							error.log(new Error(err));
							return clbk();
						}

						return clbk();
					}
				);
			}
		);
	}
}

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * MODULE.INIT.MINITASKS
 * - Add minitasks to modules.
 * - Minitask ids are listed in `ldcDbData.skills_and_minitasks.skills.minitasks`.
 * - Add minitask objects to `ldcData.minitasks` array.
 */
exports.initMinitasks = function(req, res) {
	logger.filename(__filename);

	var lines,
		cleanLines = [],
		headers,
		addedMinitasks = 0;

	// read csv file
	logger.dash('reading csv file');
	fs.readFile('data/scored_modules_minitasks.csv', 'utf8', function(err, data) {
		if (err) {
			error.log(new Error(err));
			return res.status(500).send({error: err});
		}

		// split csv file into lines
		lines = data.split('\r\n');

		// grab headers
		try {
			headers = parse(lines[0], {delimiter: ';'})[0];
		} catch(err) {
			err.message += ' - error grabbing headers';
			error.log(err);
			return res.status(500).send({error: err});
		}

		// clean up lines (html fields contain '\r\n')
		logger.dash('cleaning up lines ('+lines.length+')');
		var lineStartRegex = /^[0-9]{4,7};/,
			lineEndRegex = /;$/,
			previousLine;
		for (var i=1, x=lines.length; i<x; i++) {
			if(i%1000 === 0) {
				logger.arrow('line '+i+' ('+Math.round(i/lines.length*100)+'%)');
			}
			if (lineStartRegex.test(lines[i])) {
				cleanLines.push(lines[i]);
			} else {
				cleanLines[cleanLines.length-1] += lines[i];
			}
		}

		// process each line/minitask
		logger.dash('adding minitasks ('+cleanLines.length+')');
		cleanLines.forEach(function(line, lineIndex) {
			setTimeout(
				function() {
					addMinitask(headers, line, lineIndex, function() {
						addedMinitasks++;
						if (addedMinitasks%10 === 0) {
							logger.arrow(addedMinitasks+' ('+Math.round((addedMinitasks/cleanLines.length)*100)+'%) - minitask added');
						}
						if (addedMinitasks >= cleanLines.length) {
							logger.arrow('done');
						}
					});
				},
				250*lineIndex // every 1/2 second
			);
		});

		// make sure all modules have minitask array (for module.export.datasets.js aggregation queries)
		Module.update(
			{ldcDbData: {$exists: true}, 'ldcDbData.minitasks': {$exists: false}},
			{$set: {'ldcDbData.minitasks': []}},
			{multi: true},
			function(err) {
				if (err) {
					error.log(new Error(err));
				}
			}
		);

		// respond to client
		return res.status(200).send('Working on adding minitasks.');
	});
};