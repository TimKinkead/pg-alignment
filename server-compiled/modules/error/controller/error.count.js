"use strict";

var mongoose = require("mongoose"), Error = mongoose.model("Error"), error = require("../../error"), logger = require("../../logger");

exports.count = function(a, b) {
    logger.filename(__filename), Error.count().exec(function(a, c) {
        return a ? (a = new Error(a), error.log(a), b.status(500).send(a)) : b.status(200).send(c ? c.toString() : "");
    });
};