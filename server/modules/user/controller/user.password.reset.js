'use strict';

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

/**
 * USER.PASSWORD.RESET
 * - Reset password with reset token.
 */
exports.resetPassword = function(req, res) {
	logger.filename(__filename);

    // check parameters
    if (!req.body.email) {
        return res.status(400).send({message: 'Please provide your email address.'});
    }
    if (!req.body.password) {
        return res.status(400).send({message: 'Please provide a new password.'});
    }
    if (!req.body.passwordResetCode) {
        return res.status(400).send({message: 'Password reset error. Please try again.'});
    }
    
    // get user
    logger.dash('getting user');
    User.findOne({email: req.body.email.toLowerCase()})
        .exec(function(err, userDoc) {
            if (err) {
                error.log(new Error(err)); 
                return res.status(500).send({error: err});
            }
            if (!userDoc) {
                return res.status(404).send({message: '!user'});
            }

            // check reset code
            if (!userDoc.passwordResetCode || !userDoc.passwordResetExp || req.body.passwordResetCode !== userDoc.passwordResetCode || userDoc.passwordResetExp < new Date()) {
                return res.status(403).send({message: '!validReset'});
            }

            // reset password
            logger.dash('resetting password');
            userDoc.password = req.body.password;
            userDoc.save(function(err) {
                if (err) {
                    error.log(new Error(err));
                    return res.status(500).send({error: err});
                }

                // done
                logger.arrow('password reset');
                return res.sendStatus(200);
            });
        });
};
