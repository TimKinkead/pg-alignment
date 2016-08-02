'use strict';

module.exports = {
    'client-dev': {
        files: [
            {
                src: 'client/modules/core/less/core.less',
                dest: 'client-compiled/styles.css'
            },
            {
                src: 'client/modules/core/less/core.less',
                dest: 'client/styles.css'
            }
        ]
    },
    'client-prod': {
        options: {
            cleancss: true,
            compress: true
        },
        src: 'client/modules/core/less/core.less',
        dest: 'client-compiled/styles.css'
    }
};
