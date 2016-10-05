"use strict";

exports.getData = function(a, b) {
    if (!a) return null;
    switch (b) {
      case "settings":
        return {
            _id: a._id,
            id: a.id,
            firstName: a.firstName,
            lastName: a.lastName,
            email: a.email,
            admin: a.admin
        };

      default:
        return {
            _id: a._id,
            id: a.id,
            name: a.name,
            initials: a.initials,
            admin: a.admin
        };
    }
};