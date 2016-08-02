'use strict';

// NOT USING THIS! NOT NECESSARY!

/**
 * Reformat `ldc_reviews.csv` and save as `reviews.csv` for machine learning pipeline.
 */

//----------------------------------------------------------------------------------------------------------------------
// Dependencies
	
var readline = require('readline'),
	fs = require('fs'),
	parse = require('csv-parse/lib/sync'),
	chalk = require('chalk');

//----------------------------------------------------------------------------------------------------------------------
// Variables

var sourceFile = 'data/ldc_reviews.csv',
	outputFile = 'data/reviews.csv',
	headers = null,
	idIndex = null,
	lineNo = 0,
	reviews = {},
	fields = [
		'id',
		'modulename',
		'discipline',
		'graderange',
		'linktomodule',
		'tasktemplate',
		'theteachingtask',
		'authornames',
		'reviewername',
		'reviewerid',
		'ldc_rating_id',
		'writing_type_id',
		'description',
		'rcattitle',
		'rctitle',
		'code',
		'rltitle',
		'rlscore',
		'rsddescriptors'
		//'indicator_id1',
		//'score1',
		//'indicator_id2',
		//'score2'
	];

//----------------------------------------------------------------------------------------------------------------------
// Methods

function csvEscape(str) {
	return '"' + String(str || '').replace(/\"/g, '""') + '"';
}

function getCsvHeaders() {
	return fields.map(csvEscape).join(',');
}

function getCsv(review) {
	var csvArray = new Array(fields.length);
	for (var i=0, x=fields.length; i<x; i++) {
		if (review.hasOwnProperty(fields[i])) {
			csvArray[i] = review[fields[i]];
		}
	}
	return csvArray.map(csvEscape).join(',');
}

//----------------------------------------------------------------------------------------------------------------------
// Main

// start
console.log(chalk.green.bold('\nSTARTING REFORMAT'));

// initialize line reader
console.log(chalk.green('\n- Reading file `'+sourceFile+'`'));
var lineReader = readline.createInterface({
	input: fs.createReadStream(sourceFile)
});

// handle each line of csv file
lineReader.on('line', function(line) {
	lineNo++;
	if (lineNo % 1000 === 0) {
		console.log(chalk.green('  - line no '+lineNo));
	}
	line = parse(line, {delimiter: ','})[0];
	
	// grab headers
	if (!headers) {
		headers = line;
		idIndex = headers.indexOf('id');
		//console.log(chalk.blue.bold('\nHeaders'));
		//console.log(chalk.blue(headers));
		return;
	}
	
	// construct review object
	var review = {};
	for (var i=0, x=line.length; i<x; i++) {
		review[headers[i]] = line[i];
	}

	// transform review object saving indicator/score as key/value pairs
	if (review.indicator_id1 && review.score1) {
		review[review.indicator_id1] = review.score1;
		if (!fields.indexOf(review.indicator_id1) > -1) {
			fields.push(review.indicator_id1);
		}
	}
	if (review.indicator_id2 && review.score2) {
		review[review.indicator_id2] = review.score2;
		if (!fields.indexOf(review.indicator_id2) > -1) {
			fields.push(review.indicator_id2);
		}
	}
	delete review.indicator_id1;
	delete review.score1;
	delete review.indicator_id2;
	delete review.score2;

	// save review to reviews object
	if (review.id) {
		if (!reviews[review.id]) { reviews[review.id] = {}; }
		for (var key in review) {
			if (review.hasOwnProperty(key) && !reviews[review.id][key]) {
				reviews[review.id][key] = review[key];
			}
		}
	}
});

// handle error
lineReader.on('error', function(err) {
	console.log(chalk.red.bold('ERROR!'));
	console.log(chalk.red(JSON.stringify(err, null, 4)));
});

// done
lineReader.on('close', function() {

	// write to new csv file
	console.log(chalk.green('\n- Writing file `'+outputFile+'`'));
	var writeStream = fs.createWriteStream(outputFile);
	writeStream.write(getCsvHeaders()+'\n');
	for (var id in reviews) {
		if (reviews.hasOwnProperty(id)) {
			writeStream.write(getCsv(reviews[id])+'\n');
		}
	}
	writeStream.end();

	// done
	console.log(chalk.green.bold('\n-> REFORMAT DONE'));
});