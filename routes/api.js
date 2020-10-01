"use strict";

/**
 * Initialization
 */
const express = require("express");
const router = express.Router();
const storage = require("../config/storage");
const AnnouncementController = require("../controllers/announcement-controller");
const AuthenticationController = require("../controllers/authentication-controller");
const BatchController = require("../controllers/batch-controller");
const LoginValidator = require("../validators/auth/login-validator");
const RegisterValidator = require("../validators/auth/register-validator");
const VerifyOTPValidator = require("../validators/auth/verify-otp-validator");
const CreateBatchValidator = require("../validators/batch/create-batch-validator");
const CreateAnnouncementValidator = require("../validators/create-announcement-validator");

// Authentication Routes
router.post('/register', RegisterValidator.middleware, AuthenticationController.register);
router.post('/verify-otp', VerifyOTPValidator.middleware, AuthenticationController.verifyOTP);
router.post('/login', LoginValidator.middleware, AuthenticationController.login);

// // Batches
// router.get('/batch', BatchController.index);
// router.post('/batch', CreateBatchValidator.middleware, BatchController.create);


// // Announcements
// router.get('/announcement', AnnouncementController.index);
// router.post('/announcement', CreateAnnouncementValidator.middleware, AnnouncementController.create);
// router.delete('/announcement/:id', AnnouncementController.delete);

module.exports = router;
