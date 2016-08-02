'use strict';

var timer = require('grunt-timer'),
	fs = require('fs');

/**
 * Configuration file for the Grunt Task Runner.
 * - http://gruntjs.com/sample-gruntfile
 */
module.exports = function(grunt) {

	// grunt timer
	timer.init(grunt, {ignoreAlias: ['default', 'development', 'client', 'server', 'production']});

	// grunt config object
	var config = {pkg: grunt.file.readJSON('package.json')};

	// add task-specific configuration to grunt config object
	(function () {
		var files = fs.readdirSync('./tasks/config');
		files.forEach(function(filename) {
			var name = filename.slice(0, filename.indexOf('.js'));
			config[name] = require('./tasks/config/'+filename);
			if (typeof config[name] === 'function') {
				config[name] = config[name]();
			}
		});
	})();

	// write config object to temp file
	fs.writeFile('./temp/grunt.config.json', JSON.stringify(config, null, 4));

	// initialize grunt with config object
	grunt.initConfig(config);

	// load grunt tasks from node_modules (via a node module)
	require('load-grunt-tasks')(grunt);

	// load custom grunt tasks
	// ex: grunt.registerTask('default', [<task list>]);
	(function () {
		var files = fs.readdirSync('./tasks/custom');
		files.forEach(function(filename) {
			var name = filename.slice(0, filename.indexOf('.js'));
			require('./tasks/custom/'+filename)(grunt, config);
		});
	})();
	
};
