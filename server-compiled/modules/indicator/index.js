"use strict";

var _ = require("lodash"), file = require("../file");

module.exports = function() {
    var a = {}, b = module.filename.slice(module.filename.indexOf("modules") + 8, module.filename.indexOf("index.js") - 1), c = [ "server/modules/" + b + "/controller/*.js", "server/modules/" + b + "/controller/**/*.js" ], d = "server/modules/" + b;
    return file.globber(c, d).forEach(function(b) {
        a = _.extend(a, require("." + b));
    }), a;
}();