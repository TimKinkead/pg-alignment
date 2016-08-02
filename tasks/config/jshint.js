'use strict';

// check js syntax (see '.jshintrc' for config)
module.exports = {
    client: {
        src: [
            'client/*.js',
            'client/modules/**/*.js'
        ],
        options: {
            jshintrc: true
        }
    },
    server: {
        src: [
            '*.js',
            'server/*.js',
            'server/**/*.js'
        ],
        options: {
            jshintrc: true
        }
    }
};
