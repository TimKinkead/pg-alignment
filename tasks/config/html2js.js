'use strict';

// production only
// minify client html files
module.exports = {
	options: {
		module: 'app',
		singleModule: true,
		existingModule: true,

		rename: function (name) {
			return name.substr('../client/'.length);
		},

		quoteChar: '\'',
		htmlmin: {
			removeComments: true,
			collapseWhitespace: true
		}
	},
	'client-prod': {
		src: ['client/modules/**/*.html'],
        dest: 'client-compiled/templates.js'
    }
};
