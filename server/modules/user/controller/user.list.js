'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Mongoose Models

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
 * USER.LIST
 * - Get list of all users. (admin only)
 */
exports.list = function(req, res) {
    logger.filename(__filename);

    // build select
    var select;
    if (req.query.namesOnly) { select = '_id name'; }
    else { select = '_id id name email'; }
    
    // get users
    User.find()
        //.select(select)
        .exec(function(err, userDocs) {
            if (err) {
                error.log(new Error(err));
                return res.status(500).send({error: err});
            }

            // done 
            return res.status(200).send(userDocs || []); 
        });
};