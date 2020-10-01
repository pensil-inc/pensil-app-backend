'use strict';

const db = require('mongoose');

db.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(response => {
    console.log('connected mongo db');
}).catch(error => {
    if(error) {
        console.log('could not connect to mongo db -', error);
    }
});

db.set('useFindAndModify', false);

module.exports = db;