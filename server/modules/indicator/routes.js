'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var indicator = require('../indicator');

//----------------------------------------------------------------------------------------------------------------------
// Routes

module.exports = function(app) {

    // initialize indicators
    app.route('/data/indicator/init')
        .get(indicator.init);
    
    // CRUD for an indicator
    app.route('/data/indicator')
        .get(indicator.read);
    
    // get indicator info
    app.route('/data/indicator/info')
        .get(indicator.info);
    
    // list indicators
    app.route('/data/indicator/list')
        .get(indicator.list);
    
};
