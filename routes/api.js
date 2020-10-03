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
const StudentController = require("../controllers/student-controller");
const StudentAnnouncementController = require("../controllers/student/student-announcement-controller");
const StudentBatchController = require("../controllers/student/student-batch-controller");
const AuthMiddleware = require("../middlewares/auth-middleware");
const LoginValidator = require("../validators/auth/login-validator");
const RegisterValidator = require("../validators/auth/register-validator");
const VerifyOTPValidator = require("../validators/auth/verify-otp-validator");
const CreateBatchValidator = require("../validators/batch/create-batch-validator");
const CreateAnnouncementValidator = require("../validators/create-announcement-validator");

// Authentication Routes
router.post('/register', RegisterValidator.middleware, AuthenticationController.register);
router.post('/verify-otp', VerifyOTPValidator.middleware, AuthenticationController.verifyOTP);
router.post('/login', LoginValidator.middleware, AuthenticationController.login);

// Batches
router.get('/batch', AuthMiddleware, BatchController.index);
router.post('/batch', AuthMiddleware, CreateBatchValidator.middleware, BatchController.create);


// Announcements
router.get('/announcement', AuthMiddleware, AnnouncementController.index);
router.post('/announcement', AuthMiddleware, CreateAnnouncementValidator.middleware, AnnouncementController.create);
router.post('/announcement/:id', AuthMiddleware, CreateAnnouncementValidator.middleware, AnnouncementController.update);
router.delete('/announcement/:id', AuthMiddleware, AnnouncementController.delete);

// Other
router.get('/get-all-student-list', AuthMiddleware, StudentController.list);

// Student routes
router.use('/student', AuthMiddleware, (function () {
    const router = express.Router();

    router.get('/my-batches', StudentBatchController.index);
    router.get('/my-announcements', StudentAnnouncementController.index);

    return router;
})());

module.exports = router;
