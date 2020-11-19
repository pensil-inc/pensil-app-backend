'use strict';

function initDatabase() {

    const db = require('mongoose');

    db.connect(
        process.env.MONGODB_URI,
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