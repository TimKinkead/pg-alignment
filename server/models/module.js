'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//----------------------------------------------------------------------------------------------------------------------
// Schema

var ModuleSchema = new Schema({

    //_id: {type: ObjectId} // automatically created for each document

	// LDC id/uuid (https://coretools.ldc.org/mods/ec303d00-29de-4b26-9f69-bb31034a81b1)
	ldcId: {
		type: String,
		required: true,
		unique: true
	},

	// data from spreadsheet (https://docs.google.com/a/prevagroup.com/spreadsheets/d/1god26dt-brdnmdK61hCjREYGUdhccr09QEmbglCdDf8/edit?usp=sharing)
	spreadsheetData: {
		type: Object
	},

	// data from ldc api (https://api.ldc.org/api/v1/mods/ec303d00-29de-4b26-9f69-bb31034a81b1)
	ldcApiData: {
		type: Object
	},
	
	// data extracted from ldc database via pgAdmin (attempting to mirror api data schema)
	ldcDbData: {
		type: Object
	},

	// error downloading ldc data from api.
	downloadError: {
		statusCode: {type: Number},
		body: {type: Object}
	},

	// manual scores (ex: {<indicator>: <score>, td1a1: 1}
	manualScores: {
		type: Object
	},

	// predicted scores (ex: {<indicator>: <score>, td1a1: 1}
	predictedScores: {
		type: Object
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

mongoose.model('Module', ModuleSchema);
