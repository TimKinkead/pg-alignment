'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Methods

var userUtil = require('./util/user.get.data');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * Return basic user data.
 */
exports.read = function(req, res) {
    logger.filename(__filename);

    return res.status(200).send(userUtil.getData(req.user, 'default'));
};