'use strict';

module.exports = {
	'client-prod-app': {
		options: {
			mangle: {
				except: ['angular']
			},
			sourceMap: true,
			sourceMapIn: 'client-compiled/app.js.map'
		},
		files: [{
			src: 'client-compiled/app.js',
			dest: 'client-compiled/app.min.js'
		}]
	},
	'client-prod-lib': {
		options: {
			mangle: {
				except: ['angular']
			}
		},
		files: [{
			src: 'client-compiled/lib.js',
			dest: 'client-compiled/lib.min.js'
		}]
	},
	'client-prod-tpl': {
		options: {
			mangle: {
				except: ['angular']
			}
		},
		files: [{
			src: 'client-compiled/templates.js',
			dest: 'client-compiled/templates.min.js'
		}]
	},
	'server-prod': {
		options: {
			beautify: true // for better stack trace?
		},
		files: [
			{
				expand: true,
				cwd: 'server',
				src: ['**/*.js'],
				dest: 'server-compiled'
			}
		]
	}
};