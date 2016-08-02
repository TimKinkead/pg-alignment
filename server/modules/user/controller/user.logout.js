'use strict';

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};
