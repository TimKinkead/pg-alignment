"use strict";

var mongoose = require("mongoose"), Indicator = mongoose.model("Indicator"), error = require("../../error"), logger = require("../../logger");

exports.info = function(a, b) {
    logger.filename(__filename), Indicator.aggregate([ {
        $sort: {
            id: 1
        }
    }, {
        $group: {
            _id: "$indicatorCategory",
            holisticCategory: {
                $first: "$holisticCategory"
            },
            guidingQuestion: {
                $first: "$guidingQuestion"
            },
            indicators: {
                $push: {
                    id: "$id",
                    scores: "$scores"
                }
            }
        }
    }, {
        $group: {
            _id: "$holisticCategory",
            indicatorCategories: {
                $push: {
                    indicatorCategory: "$_id",
                    guidingQuestion: "$guidingQuestion",
                    indicators: "$indicators"
                }
            }
        }
    }, {
        $group: {
            _id: null,
            holisticCategories: {
                $push: {
                    holisticCategory: "$_id",
                    indicatorCategories: "$indicatorCategories"
                }
            }
        }
    } ], function(a, c) {
        function d(a, b) {
            return h.indexOf(a.holisticCategory) < h.indexOf(b.holisticCategory) ? -1 : h.indexOf(a.holisticCategory) > h.indexOf(b.holisticCategory) ? 1 : 0;
        }
        function e(a, b) {
            return i.indexOf(a.indicatorCategory) < i.indexOf(b.indicatorCategory) ? -1 : i.indexOf(a.indicatorCategory) > i.indexOf(b.indicatorCategory) ? 1 : 0;
        }
        function f(a, b) {
            return j.indexOf(a.indicatorCategory) < j.indexOf(b.indicatorCategory) ? -1 : j.indexOf(a.indicatorCategory) > j.indexOf(b.indicatorCategory) ? 1 : 0;
        }
        if (a) return a = new Error(a), error.log(a), b.status(500).send(a);
        if (!c || !c[0]) return a = new Error("!results || !results[0]"), error.log(a), 
        b.status(500).send(a);
        var g = c[0], h = [ "Task", "Ladder" ], i = [ "Task Clarity & Coherence", "Content", "Text", "Writing Product" ], j = [ "Skills", "Instruction", "Results" ];
        return g.holisticCategories && (g.holisticCategories.sort(d), g.holisticCategories[0] && g.holisticCategories[1] && (g.holisticCategories[0].indicatorCategories.sort(e), 
        g.holisticCategories[1].indicatorCategories.sort(f))), b.status(200).send(g);
    });
};