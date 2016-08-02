'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var _ = require('lodash'),
	glob = require('glob');

//----------------------------------------------------------------------------------------------------------------------
// Methods

exports.globber = function(globPatterns, removeRoot) {

	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// if glob pattern is an array, use each pattern in a recursive way
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.globber(globPattern, removeRoot));
		});
	}

    // if glob pattern is a string, use the globber
    else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
            var files = glob.sync(globPatterns);
            files = files.map(function(file) {
                return file.replace(removeRoot, '');
            });
            output = _.union(output, files);
		}
	}

	return output;
};
