"use strict";

var mongoose = require("mongoose"), User = mongoose.model("User"), error = require("../../error"), logger = require("../../logger");

exports.list = function(a, b) {
    logger.filename(__filename);
    var c;
    c = a.query.namesOnly ? "_id name" : "_id id name email", User.find().exec(function(a, c) {
        return a ? (error.log(new Error(a)), b.status(500).send({
            error: a
        })) : b.status(200).send(c || []);
    });
};