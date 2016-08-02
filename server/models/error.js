'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//----------------------------------------------------------------------------------------------------------------------
// Variables

var pkg = require('../../package.json');

//----------------------------------------------------------------------------------------------------------------------
// Schema

/**
 * Error Doc Schema
 * - The mongoose model 'Error' corresponds to the mongodb collection 'errors'.
 * - An 'Error' represents an error that was captured in the application.
 * - See the Node.js docs for more info: https://nodejs.org/api/errors.html#errors_class_error
 */
var ErrorSchema = new Schema({

    //_id: {type: ObjectId} // automatically created for each document

    // error name (ex: 'Error')
    name: {
        type: String
    },

    // error message (ex: 'the expected thing didn't happen')
    message: {type: String},

    // the stack trace
    stack: [{
        type: String
    }],
    
    // error type
    type: {
        type: String,
        enum: ['server', 'client']
    },
    
    // priority
    priority: {
        type: Boolean
    },

    // any other info
    info: {
        type: Object
    },

    // the application version when the error happened
    release: {
        type: String,
        default: pkg.version
    },

    // timestamp - when the error doc was created
    created: {
        type: Date,
        default: Date.now
    }
});

//----------------------------------------------------------------------------------------------------------------------
// Static Methods

//----------------------------------------------------------------------------------------------------------------------
// Pre & Post Methods

/**
 * Pre-validation hook to transform stack string into more readable array.
 */
ErrorSchema.pre('validate', function(next) {
    if (this.stack) {
        var stackString;
        if (this.stack.length) {
            stackString = '';
            for (var i=0,x=this.stack.length; i<x; i++) {
                stackString += this.stack[i].toString()+(i<x-1 ? '\n' : '');
            }
        } else {
            stackString = this.stack.toString();
        }
        this.stack = stackString.split(/\n\s*/);
    }
    next();
});

//----------------------------------------------------------------------------------------------------------------------
// Initialize Model

mongoose.model('Error', ErrorSchema);
