"use strict";

var mongoose = require("mongoose"), Schema = mongoose.Schema, IndicatorSchema = new Schema({
    holisticCategory: {
        type: String,
        required: !0
    },
    indicatorCategory: {
        type: String,
        required: !0
    },
    guidingQuestion: {
        type: String,
        required: !0
    },
    id: {
        type: String,
        required: !0,
        unique: !0
    },
    scores: [ {
        _id: !1,
        no: {
            type: Number
        },
        description: {
            type: String
        }
    } ],
    azureStudio: {
        type: String
    },
    apiKey: {
        type: String
    },
    apiDocs: {
        type: String
    },
    apiEndpoint: {
        type: String
    },
    modified: {
        type: Date,
        "default": Date.now
    },
    created: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model("Indicator", IndicatorSchema);