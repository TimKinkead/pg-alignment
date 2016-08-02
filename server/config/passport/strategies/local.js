'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

//----------------------------------------------------------------------------------------------------------------------
// Models

var mongoose = require('mongoose'),
	User = mongoose.model('User');

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * Local Authentication Strategy
 * - Sign Up / Login
 */
module.exports = function() {

	// custom username / password options
	var passportOptions = {
		usernameField: 'email',
		passwordField: 'password'
	};

	// local strategy
	passport.use('local', new LocalStrategy(passportOptions, function(username, password, clbk) {

        // find user by email
        User.findOne({email: username}, function(err, user) {
            if (err) { return clbk(new Error(err)); }

            // done
            return clbk(null, user, (user && user.authenticate(password)));
        });
    }));
};
