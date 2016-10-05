"use strict";

var indicator = require("../indicator");

module.exports = function(a) {
    a.route("/data/indicator/init").get(indicator.init), a.route("/data/indicator").get(indicator.read), 
    a.route("/data/indicator/info").get(indicator.info), a.route("/data/indicator/list").get(indicator.list);
};