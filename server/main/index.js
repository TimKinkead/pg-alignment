'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Variables

var auth = require('../../auth.js'),
    config = require('../../config.js');

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var user = require('../modules/user');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * Render index.html (the angular application skeleton).
 */
module.exports = function(req, res) {

	res.render(
        'index',
        {
            title: config.project.title,
            description: config.project.description,
            keywords: config.project.keywords,
            files: process.env.NODE_ENV === 'production' ? 
                ['lib.min.js', 'app.min.js', 'templates.min.js'] : 
                require('../../config').jsFiles,
            favicon: 'favicon.ico',
            user: req.user ? user.getData(req.user, 'default') : null,
            googleBrowserKey: process.env.NODE_ENV === 'production' ? '?key=' + auth.googleBrowserKey : '',
            helpers: {
                json: function(obj) {
                    return JSON.stringify(obj);
                }
            }
        }
    );
};
