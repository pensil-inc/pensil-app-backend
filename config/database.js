'use strict';

function initDatabase() {

    const db = require('mongoose');

    const DB_URI = process.env.NODE_ENV === "test"
        ? process.env.MONGODB_URI_TEST
        : process.env.MONGODB_URI;

    db.connect(
        DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(_ => {
            if (process.env.APP_ENV === "development") {
                console.info('connected to mongodb');
            }
        })
        .catch(error => {
            if (error) {
                console.log('could not connect to mongo db -', error);
            }
        });

    db.set('useFindAndModify', false);
    return db;
}

module.exports = initDatabase;