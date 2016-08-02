'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Variables

var auth = require('../../../../auth.js'),
    config = require('../../../../config.js');

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var fs = require('fs'),
    sendgrid = require('sendgrid')(auth.sendgridSecretKey),
    handlebars = require('handlebars');

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
 * Generate a random password reset code.
 * @returns {string} - combination of letters and numbers
 */
function resetCode() {
    var numbers = ['1', '2', '3', '4', '5'],
        letters = ['A', 'B', 'C', 'D', 'E'],
        code = '';
    for (var i=0; i<10; i++) {
        var num = (Math.random() < 0.5);
        if (num) {code += numbers[Math.floor(Math.random()*numbers.length)];}
        else {code += letters[Math.floor(Math.random()*letters.length)];}
    }
    return code;
}

//----------------------------------------------------------------------------------------------------------------------
// Main

/**
 * USER.PASSWORD.FORGOT
 * - Save reset password token for user.
 */
exports.forgotPassword = function(req, res) {
	logger.filename(__filename);

    if (!req.body.email) {
        return res.status(400).send({message: '!email'});
    }
    
    req.body.email = req.body.email.toLowerCase();
    
    // get user
    User.findOne({email: req.body.email})
        .select('firstName lastName email')
        .exec(function(err, userDoc) {
            if (err) {
                error.log(new Error(err));
                return res.status(500).send({error: err});
            }
            if (!userDoc) {
                return res.status(404).send({message: '!user'});
            }

            // save reset code
            userDoc.passwordResetCode = resetCode();
            userDoc.passwordResetExp = (function() {var d = new Date(); d.setDate(d.getDate()+1); return d;})();
            userDoc.save(function(err) {
                if (err) {
                    error.log(new Error(err));
                    return res.status(500).send({error: err});
                }

                // build email
                var html = fs.readFileSync('server/modules/user/email/user.email.password.forgot.html'),
                    template = handlebars.compile(html.toString()),
                    email = new sendgrid.Email({
                        to: userDoc.email,
                        toname: userDoc.name,
                        from: config.email.support.address,
                        fromname: config.email.support.name,
                        subject: config.project.name+' Password Reset',
                        html: template({
                            user: userDoc, 
                            config: config,
                            host: req.get('host')
                        })
                    });
                if (process.env.SERVER === 'cloud') {
                    email.addCategory(config.project.id);
                    email.addCategory(config.project.id+'-forgot');
                } else {
                    email.addCategory(config.project.id+'-dev');
                }

                // send email
                logger.dash('sending email');
                sendgrid.send(email, function(err, info) {
                    if (err) {
                        err = new Error(err);
                        if (info) {err.info = info;}
                        error.log(err);
                        return res.status(500).send({error: err});
                    }
                    
                    // done
                    logger.arrow('email sent');
                    return res.sendStatus(200);
                });
            });
        });
};
