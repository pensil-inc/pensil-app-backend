"use strict";

/**
 * Gather dependencies
 */
const express = require("express");
const fileUpload = require('express-fileupload');
const env = require('dotenv');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

/**
 * Read from dotenv
 */
env.config()

/**
 * Import all routers
 */
const routerProvider = require('./config/routes');

/**
 * Enable global helpers
 */
require('./config/global');

/**
 * Initialize the database
 */
const db = require("./config/database")();

/**
 * Enable cron
 */
const cron = require('./config/cron');

/**
 * Initialize the application
 */
const app = express();

/**
 * Initiate the port
 */
const port = process.env.PORT || 1000;

/**
 * Initialize webpush
 */
// const webpush = require('web-push');

/**
 * Initialize Logger
 */
if (process.env.NODE_ENV !== "test") {
  app.use(logger('dev'));
}

/**
 * Static Path
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Use body parser and form and web push
 */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  debug: process.env.APP_ENV === "development"
}));

/**
 * Enable cors
 */
app.use(cors());

/**
 * Use All Routes
 */
app.use('/', routerProvider);

/**
 * default path
 */
app.use("*", (req, res) => {
  if(req.headers.accept === "application/json") {
    res.status(404).json({ message: "Not found!" });
  } else {
    res.status(404).send("Not found!");
  }
});

app.use(require('./config/errorhandler'));

module.exports = app;
