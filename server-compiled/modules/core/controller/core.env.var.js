"use strict";

exports.envVar = function(a, b) {
    return b.status(200).send({
        NODE_ENV: process.env.NODE_ENV,
        SERVER: process.env.SERVER,
        PORT: process.env.PORT,
        DB_CONNECTION: process.env.DB_CONNECTION,
        LOGGER: process.env.LOGGER
    });
};