'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var _module = require('../module');

//----------------------------------------------------------------------------------------------------------------------
// Routes

module.exports = function(app) {

    // get module
    app.route('/data/module')
        .get(_module.read);
    
    // list modules
    app.route('/data/module/list')
        .get(_module.list);

    // get modules summary
    app.route('/data/module/summary')
        .get(_module.summary);
    
    // initialize modules from reviews spreadsheet
    app.route('/data/module/init-from-reviews')
        .get(_module.initFromReviews);

    // initialize modules from modules.csv
    app.route('/data/module/init-from-modules')
        .get(_module.initFromModules);

    // initialize/add minitasks to modules
    app.route('/data/module/init-minitasks')
        .get(_module.initMinitasks);

    // download modules from ldc
    app.route('/data/module/download')
        .get(_module.download);

    // count modules
    app.route('/data/module/count')
        .get(_module.count);
    
    // export datasets
    app.route('/data/module/download-datasets')
        .get(_module.downloadDatasets);
    
    // predict indicator score
    app.route('/data/module/predict-indicator-score')
        .get(_module.predict);
    
};
