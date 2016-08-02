'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var passport = require('passport'),
    _ = require('lodash');

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var error = require('../../error'),
    logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Methods

var userUtil = _.extend({}, require('./util/user.get.data'));

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * USER.LOGIN
 * - Authenticate user & login.
 */
exports.login = function(req, res, next) {
	logger.filename(__filename);

    if (!req.body.email || !req.body.password) {
        return res.status(400).send({message: 'Please provide your email address and password.'});
    }

    // email & password variables for passport
    var email = req.body.email.toLowerCase(),
        password = req.body.password;

    // passport authentication
    logger.dash('checking password');
    passport.authenticate('local', function(err, user, validPassword) {
        if (err) { error.log(err); return res.status(500).send(err); }
        if (!user) { return res.status(401).send({message: '!user'}); }
        if (!validPassword) { return res.status(401).send({message: '!validPassword'}); }

        // login user
        logger.dash('logging in user');
        req.login(user, function(err) {
            if (err) {
                error.log(new Error(err));
                return res.status(500).send(err);
            }

            // done
            logger.arrow('user authenticated and logged in');
            return res.status(200).send(userUtil.getData(user, 'default'));
        });
    })(req, res, next);
};
