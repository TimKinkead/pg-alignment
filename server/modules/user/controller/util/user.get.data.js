'use strict';

exports.getData = function(user, type) {
    if (!user) { return null; }
    
    switch(type) {
        
        case 'settings':
            return {
                _id: user._id,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                admin: user.admin
            };
        
        default:
            return {
                _id: user._id,
                id: user.id,
                name: user.name,
                initials: user.initials,
                admin: user.admin
            };       
    }
};