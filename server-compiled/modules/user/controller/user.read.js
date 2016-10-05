"use strict";

var logger = require("../../logger"), userUtil = require("./util/user.get.data");

exports.read = function(a, b) {
    return logger.filename(__filename), b.status(200).send(userUtil.getData(a.user, "default"));
};