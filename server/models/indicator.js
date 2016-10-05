'use strict';

// See this spreadsheet for more detail: https://docs.google.com/a/prevagroup.com/spreadsheets/d/1S0XYO2ZYrcjZGriG1fUaQSLVJ7jNnKrqxfjJ1ku89hY/edit?usp=sharing

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//----------------------------------------------------------------------------------------------------------------------
// Schema

var IndicatorSchema = new Schema({

    //_id: {type: ObjectId} // automatically created for each document

	holisticCategory: {
		type: String,
		required: true
	},

	indicatorCategory: {
		type: String,
		required: true
	},

	guidingQuestion: {
		type: String,
		required: true
	},

	id: {
		type: String,
		required: true,
		unique: true
	},

	scores: [{
		_id: false,
		no: {type: Number},
		description: {type: String}
	}],
	
	// link to model in azure studio
	azureStudio: {
		type: String
	},
	
	// api key for accessing endpoint
	apiKey: {
		type: String
	},
	
	// api docs for endpoint
	apiDocs: {
		type: String
	},
	
	// api endpoint
	apiEndpoint: {
		type: String
	},

    // timestamp - when module was updated
    modified: {
        type: Date,
        default: Date.now
    },
    
    // timestamp - when module was created
	created: {
		type: Date,
		default: Date.now
	}
});

//----------------------------------------------------------------------------------------------------------------------
// Virtual Fields

//----------------------------------------------------------------------------------------------------------------------
// Instance Methods

//----------------------------------------------------------------------------------------------------------------------
// Static Methods

//----------------------------------------------------------------------------------------------------------------------
// Pre & Post Methods

//----------------------------------------------------------------------------------------------------------------------
// Initialize Model

mongoose.model('Indicator', IndicatorSchema);
