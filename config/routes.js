const express = require('express');

const apiRouter = require('../routes/api');
const webRouter = require('../routes/web');

const router = express.Router();

/**
 * Load all the routes here
 */
router.use('/api', apiRouter);
router.use('/', webRouter);

module.exports = router;