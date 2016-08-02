'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var chalk = require('chalk');

//----------------------------------------------------------------------------------------------------------------------
// Models

var mongoose = require('mongoose'),
	Err = mongoose.model('Error');

//----------------------------------------------------------------------------------------------------------------------
// Methods

/*
 * ERROR.LOG
 * - Log error to database (create error doc).
 */
exports.log = function(err) {
    if (!err || (err.constructor !== Error && typeof err !== 'object')) { return; }

    // construct error doc
    var errObj = new Err({
        name: err.name,
        message: (!err.message || err.message.constructor === String) ? err.message : JSON.stringify(err.message, null, 4),
        stack: err.stack,
        type: 'server',
        info: {}
    });
    
    // other error fields
    for (var key in err) {
        if (['name', 'message', 'stack'].indexOf(key) < 0 && err.hasOwnProperty(key)) {
            if (err[key].constructor === Array || err[key].constructor === Object) {
                errObj.info[key] = JSON.stringify(err[key], null, 4);
            } else {
                errObj.info[key] = err[key];   
            }
        }
    }

    // save error doc
    errObj.save(function(err) {
        if (err) {
            console.error(chalk.red('Error not saved!'));
            console.log(chalk.bold('> save error:'));
            console.log(err || '!newErrorDoc');
            console.log(chalk.bold('> original error:'));
            console.log(errObj);
        } else if (process.env.LOGGER === 'on') {
            console.error(chalk.red.bold('Error!'));
            console.log(errObj);
        }
    });
};