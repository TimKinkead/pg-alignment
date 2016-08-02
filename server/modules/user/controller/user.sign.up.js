'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var _ = require('lodash');

//----------------------------------------------------------------------------------------------------------------------
// Models

var mongoose = require('mongoose'),
	User = mongoose.model('User');

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
 * USER.SIGN.UP
 * - Create a new user and save doc to mongodb users collection.
 * - Log the user into the application.
 */
exports.signUp = function(req, res) {
	logger.filename(__filename);

    // check parameters
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({message: 'Please provide your first and last name.'});
    }
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({message: 'Please provide your email address and a password.'});
    }

    // initialize user doc
    var user = new User({
        // id: see below
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        admin: req.body.admin
    });

    // check existing users
    logger.dash('checking email');
    User.checkNewEmail(user.email, function(err, newEmail) {
        if (err) {
            error.log(err);
            return res.status(500).send({error: err});
        }
        if (!newEmail) {
            return res.status(500).send({message: '!newEmail'});
        }
        
        // get unique id
        logger.dash('getting id');
        User.uniqueId(function(err, id) {
            if (err) {
                error.log(err);
                return res.status(500).send({error: err});
            }
            if (!id) {
                error.log(new Error('!id'));
                return res.status(500).send({message: '!id'});
            }
            user.id = id;

            // save user
            logger.dash('saving user');
            logger.bold(JSON.stringify(user, null, 4));
            user.save(function(err) {
                if (err) {
                    error.log(new Error(err));
                    return res.status(500).send({error: err});
                }

                // login user
                logger.dash('logging in user');
                req.login(user, function(err) {
                    if (err) {
                        error.log(new Error(err));
                        return res.status(500).send({message: '!login'});
                    }

                    // done
                    logger.arrow('user signed up and logged in');
                    return res.status(200).send(userUtil.getData(user, 'default'));
                });
            }); 
        });
    });
};
