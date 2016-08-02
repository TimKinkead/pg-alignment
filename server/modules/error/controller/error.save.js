'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var logError = require('./error.log.js').log,
    priorityError = require('./error.priority.js').priority;

//----------------------------------------------------------------------------------------------------------------------
// Methods

/**
 * ERROR.SAVE
 * - Log error to database & return success.
 * - Called externally. (POST /data/error)
 */
exports.save = function(req, res) {
    
    // construct error object
    var errObj = {
        name: req.body.name,
        message: req.body.message,
        stack: req.body.stack,
        type: 'client',
        priority: req.body.priority,
        info: {}
    };
    
    // grab other error object fields
    for (var key in req.body) {
        if (['name', 'message', 'stack'].indexOf(key) < 0 && req.body.hasOwnProperty(key)) {
            if (req.body[key].constructor === Array || req.body[key].constructor === Object) {
                errObj.info[key] = JSON.stringify(req.body[key], null, 4);
            } else {
                errObj.info[key] = req.body[key];
            }
        }
    }
    
    // save error
    if (errObj.priority) {
        priorityError(errObj);
    } else {
        logError(errObj);
    }
    
    // done
    return res.sendStatus(200);
};
