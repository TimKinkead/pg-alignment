'use strict';

var config = require('../../config.js');

module.exports = {
	'client-dev': {
		files: [
			{
				expand: true,
				cwd: 'client',
				src: [
					'**/**',
					'!lib/**',
					'!modules/*.js',
					'!**/*.md'
				],
				dest: 'client-compiled'
			},
			{
				expand: true,
				//cwd: 'client',
				src: config.libFiles,
				dest: 'client-compiled'
			}
		]
	},
	'server-dev': {
		files: [
			{
				expand: true,
				cwd: 'server',
				src: [
					'**/**',
					'!**/*.js',
					'!**/*.md'
				],
				dest: 'server-compiled'
			}
		]
	},
    'client-prod': {
        files: [
            {
				expand: true,
				cwd: 'client',
                src: [
                    'humans.txt', 
					'robots.txt',
                    'favicon.ico',
                    'lib/bootstrap/fonts/**'
                ],
				dest: 'client-compiled'
            }
        ]
    },
	'server-prod': {
		files: [
			{
				expand: true,
				cwd: 'server',
				src: [
					'**/**.json'
				],
				dest: 'server-compiled'
			}
		]	
	}
};
