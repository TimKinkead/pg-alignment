'use strict';

module.exports =  {
	'client-dev': {
		options: {
			presets: ['es2015']
		},
		files: [
			{
				expand: true,
				cwd: 'client/',
				src: [
					'modules/*.js'
				],
				dest: 'client-compiled/'
			}
		]
	},
	'server-dev': {
		options: {
			presets: ['es2015']
		},
		files: [
			{
				expand: true,
				cwd: 'server/',
				src: ['**/*.js'],
				dest: 'server-compiled/'
			}
		]
	},
	'client-prod': {
		options: {
			sourceMap: true,
			inputSourceMap: null, // overwritten by 'configForBabel' task (see gruntfile.js)
			presets: ['es2015']
		},
		files: [
			{
				expand: true,
				cwd: 'client-compiled/',
				src: ['app.js'],
				dest: 'client-compiled/'
				//ext: '.babel.js'
			}
		]
	},
	'server-prod': {
		options: {
			//sourceMap: true,
			presets: ['es2015']
		},
		files: [
			{
				expand: true,
				cwd: 'server/',
				src: ['**/*.js'],
				dest: 'server-compiled/'
			}
		]
	}
};