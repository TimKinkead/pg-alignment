"use strict";

var _ = require("lodash"), logger = require("../../logger"), userUtil = _.extend({}, require("./util/user.get.data"));

exports.readSettings = function(a, b) {
    return logger.filename(__filename), a.user ? b.status(200).send(userUtil.getData(a.user, "settings")) : void b.redirect("/login");
};