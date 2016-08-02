'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var error = require('../error');

//----------------------------------------------------------------------------------------------------------------------
// Routes

module.exports = function(app) {

    app.route('/data/error')
        .post(error.save);

    // count errors
    app.route('/data/error/count')
        .get(error.count);

};
