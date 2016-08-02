'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var _ = require('lodash');

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Methods

var userUtil = _.extend({}, require('./util/user.get.data'));

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * Return user settings.
 */
exports.readSettings = function(req, res) {
    logger.filename(__filename);

    if (!req.user) {
        res.redirect('/login');
        return;
    }

    // done
    return res.status(200).send(userUtil.getData(req.user, 'settings'));
};