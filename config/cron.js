const cron = require('node-cron');
const sample_cron = require('../crons/sample_cron');

/**
 *             ┌────────────── second (optional)
 *             │ ┌──────────── minute
 *             │ │ ┌────────── hour
 *             │ │ │ ┌──────── day of month
 *             │ │ │ │ ┌────── month
 *             │ │ │ │ │ ┌──── day of week
 *             │ │ │ │ │ │
 *             │ │ │ │ │ │
 *             * * * * * *
 */
cron.schedule('*/5 * * * * *', _ => {
    // call your crons here
    // sample_cron(); // enable when wanna use the sample cron
});