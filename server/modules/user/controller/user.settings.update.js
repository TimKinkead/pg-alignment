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

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * USER.SETTINGS.UPDATE
 * - Update a user's settings.
 */
exports.updateSettings = function(req, res) {
	logger.filename(__filename);

    // error message
    function errorMessage(code, alert, message, err) {
        if (typeof code !== 'number') { err = code; code = null; }
        return res.status(code || 500).send({
            alert: alert || 'danger',
            message: message || 'We had trouble updating your settings. Please try again.',
            error: err
        });
    }

    if (!req.user) { res.redirect('/login'); return; }

    // update settings
    function updateUserSettings() {
        logger.dash('updating settings');
        
        if (req.body.firstName) { req.user.firstName = req.body.firstName; }
        if (req.body.lastName) { req.user.lastName = req.body.lastName; }
        if (req.body.email) { req.user.email = req.body.email; }
        if (req.body.newPassword) { 
            req.user.password = req.body.newPassword;
        }
        
        req.user.save(function(err) {
            if (err) {err = new Error(err); error.log(err); errorMessage(err); return; }

            // done
            logger.arrow('user settings updated');
            return res.sendStatus(200);
        });
    }
    
    // check password
    function checkPassword() {
        logger.dash('checking password');
        if (!req.body.password) { errorMessage(401, 'danger', 'Please provide your current password if you want to set a new password.'); return; }
        User.findById(req.user._id)
            .select('password salt')
            .exec(function(err, userDoc) {
                if (err) { err = new Error(err); error.log(err); errorMessage(err); return; }
                if (!userDoc) { err = new Error('!userDoc'); error.log(err); errorMessage(err); return; }
                if (!userDoc.authenticate(req.body.password)) {
                    errorMessage(401, 'danger', 'Your existing password is incorrect. Please try again.');
                    return;
                }
                updateUserSettings();
            });
    }
    
    // start
    if (req.body.newPassword) {
        checkPassword();
    } else {
        updateUserSettings();
    }
};
