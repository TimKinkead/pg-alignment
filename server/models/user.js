'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

//----------------------------------------------------------------------------------------------------------------------
// Schema

var UserSchema = new Schema({

    //_id: {type: ObjectId} // automatically created for each document

    // simple unique id
    id: {
        type: Number,
        required: true,
        unique: true
    },
    
    // name
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    
    // email
	email: {
		type: String,
		trim: true,
        lowercase: true,
		match: /.+\@.+\..+/,
        required: true,
        unique: true
	},

    // password
    password: {
        type: String,
        required: false // not required if admin creates grader
    },
    salt: {
        type: String
    },
    passwordResetCode: {
        type: String
    },
    passwordResetExp: {
        type: Date
    },

    // permissions
    admin: {
        type: Boolean,
        default: false
    },
    
    // timestamp - when user signed up
	created: {
		type: Date,
		default: Date.now
	}
});

//----------------------------------------------------------------------------------------------------------------------
// Virtual Fields

/**
 * Virtual field for name.
 */
/*UserSchema.virtual('name').get(function() {
    return (this.firstName && this.lastName) ? this.firstName+' '+this.lastName : this.firstName;
});*/

/**
 * Virtual field for initials.
 */
UserSchema.virtual('initials').get(function() {
    return this.firstName.slice(0, 1).toUpperCase()+this.lastName.slice(0, 1).toUpperCase(); 
});

//----------------------------------------------------------------------------------------------------------------------
// Instance Methods

/**
 * Instance method for hashing a password.
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Instance method for authenticating user.
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

//----------------------------------------------------------------------------------------------------------------------
// Static Methods

/**
 * Check if email is new to user collection.
 * @param email - email address
 * @param clbk - return clbk(err, true/false)
 */
UserSchema.statics.checkNewEmail = function(email, clbk) {
    if (!email) { return clbk(new Error('!email')); }
    
    var User = this;
    
    User.count({email: email})
        .exec(function(err, qty) {
            if (err) { return clbk(new Error(err)); }
            return clbk(null, qty === 0);
        });
};

/**
 * Return unique user id. (number id, not mongodb _id)
 * @param clbk - return clbk(err, id)
 */
UserSchema.statics.uniqueId = function(clbk) {

    var User = this,
        length = 4,
        checks = 0;

    function generateId() {
        var id = '';
        for (var i=0; i<length; i++) {
            id += Math.floor(Math.random()*10);
        }
        if (id.charAt(0) === '0') { id = '1'+id; }
        return Number(id);
    }
    
    function checkUniqueId(id) {
        User.count({id: id})
            .exec(function(err, qty) {
                if (err) { return clbk(new Error(err)); }
                if (qty === 0) { return clbk(null, id); }
                
                checks++;
                if (checks > 10) {
                    length++;
                    checks = 0;
                }
                
                checkUniqueId(generateId());
            });
    }
    
    checkUniqueId(generateId());
};

//----------------------------------------------------------------------------------------------------------------------
// Pre & Post Methods

/**
 * Pre validation hook to hash the password.
 */
UserSchema.pre('validate', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
    this.name = this.firstName+' '+this.lastName;
	next();
});

//----------------------------------------------------------------------------------------------------------------------
// Initialize Model

mongoose.model('User', UserSchema);
