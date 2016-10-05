"use strict";

var _module = require("../module");

module.exports = function(a) {
    a.route("/data/module").get(_module.read), a.route("/data/module/list").get(_module.list), 
    a.route("/data/module/summary").get(_module.summary), a.route("/data/module/init-from-reviews").get(_module.initFromReviews), 
    a.route("/data/module/init-from-modules").get(_module.initFromModules), a.route("/data/module/init-minitasks").get(_module.initMinitasks), 
    a.route("/data/module/download").get(_module.download), a.route("/data/module/count").get(_module.count), 
    a.route("/data/module/download-datasets").get(_module.downloadDatasets), a.route("/data/module/predict-indicator-score").get(_module.predict);
};