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
const PollController = require("../controllers/poll-controller");
const StudentController = require("../controllers/student-controller");
const StudentAnnouncementController = require("../controllers/student/student-announcement-controller");
const StudentBatchController = require("../controllers/student/student-batch-controller");
const StudentNotificationController = require("../controllers/student/student-notification-controller");
const StudentPollController = require("../controllers/student/student-poll-controller");
const AuthMiddleware = require("../middlewares/auth-middleware");
const LoginValidator = require("../validators/auth/login-validator");
const RegisterValidator = require("../validators/auth/register-validator");
const VerifyOTPValidator = require("../validators/auth/verify-otp-validator");
const CreateBatchValidator = require("../validators/batch/create-batch-validator");
const CreateAnnouncementValidator = require("../validators/create-announcement-validator");
const PollVoteValidator = require("../validators/poll-vote-validator");
const CreatePollValidator = require("../validators/poll/create-poll-validator");

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
router.delete('/announcement/:id', AuthMiddleware, AnnouncementController.delete);

// Polls
router.get('/poll', AuthMiddleware, PollController.index);
router.post('/poll', AuthMiddleware, CreatePollValidator.middleware, PollController.create);
router.delete('/poll/:id', AuthMiddleware, PollController.delete);

// Other
router.get('/get-all-student-list', AuthMiddleware, StudentController.list);
router.get('/profile', AuthMiddleware, AuthenticationController.profile);

// Student routes
router.use('/student', AuthMiddleware, (function () {
    const router = express.Router();

    router.get('/my-batches', StudentBatchController.index);
    router.get('/my-announcements', StudentAnnouncementController.index);
    router.get('/my-notifications', StudentNotificationController.index);
    router.post('/poll/:id/vote', PollVoteValidator.middleware, StudentPollController.vote);

    return router;
})());

router.get('/test', async (req, res) => { return res.json({}) });

module.exports = router;
