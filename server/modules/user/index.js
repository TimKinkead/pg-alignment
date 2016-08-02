'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var _ = require('lodash'),
    file = require('../file');

//----------------------------------------------------------------------------------------------------------------------
// Controller

module.exports = (function() {
    // parameters
    var controller = {},
        moduleName = module.filename.slice(module.filename.indexOf('modules')+8, module.filename.indexOf('index.js')-1),
        globPatterns = [
            'server/modules/'+moduleName+'/controller/*.js',
            'server/modules/'+moduleName+'/controller/**/*.js'
        ],
        rootPath = 'server/modules/'+moduleName;
    // glob files
    file.globber(globPatterns, rootPath)
        .forEach(function(routePath) {
            controller = _.extend(controller, require('.'+routePath));
        });
    // done
    return controller;
})();
