"use strict";

var _ = require("lodash"), glob = require("glob");

exports.globber = function(a, b) {
    var c = this, d = new RegExp("^(?:[a-z]+:)?//", "i"), e = [];
    if (_.isArray(a)) a.forEach(function(a) {
        e = _.union(e, c.globber(a, b));
    }); else if (_.isString(a)) if (d.test(a)) e.push(a); else {
        var f = glob.sync(a);
        f = f.map(function(a) {
            return a.replace(b, "");
        }), e = _.union(e, f);
    }
    return e;
};