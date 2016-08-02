'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Variables

var auth = require('../../../../auth.js'),
    config = require('../../../../config.js');

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var sendgrid = require('sendgrid')(auth.sendgridSecretKey),
	handlebars = require('handlebars');

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var logError = require('./error.log.js').log,
    logger = require('../../logger');

//----------------------------------------------------------------------------------------------------------------------
// Methods

/**
 * ERROR.PRIORITY
 * - Send email to errors@<domain>.com
 * - Not in email module b/c scoping issues when they reference each other.
 */
exports.priority = function(errObj) {
    logger.filename(__filename);

    if (!errObj || (errObj.constructor !== Error && typeof errObj !== 'object')) { return; }

    // save error
    errObj.priority = true;
    logError(errObj);

    // build email
    var d = new Date(),
        template = handlebars.compile(require('../email/error.email.html')),
        email = new sendgrid.Email({
            to: config.email.error.address,
            toname: config.email.error.name,
            from: config.email.server.address,
            fromname: config.email.server.name,
            subject: config.project.name+' Priority Error ('+(d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear()+')',
            html: template({err: errObj})
        });
    if (process.env.SERVER === 'cloud') {
        email.addCategory(config.project.id);
        email.addCategory(config.project.id+'-error');
    } else {
        email.addCategory(config.project.id+'-dev');
    }
    
    // send email
    logger.dash('sending email');
    sendgrid.send(email, function(err, info) {
        if (err) {
            err = new Error(err);
            if (info) {err.info = info;}
            logError(err);
            return;
        }
        logger.arrow('email sent');
    });
};
