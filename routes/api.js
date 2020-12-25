"use strict";

/**
 * Initialization
 */
const express = require("express");
const router = express.Router();
const storage = require("../config/storage");
const AnnouncementController = require("../controllers/announcement-controller");
const AssignmentController = require("../controllers/assignment-controller");
const AuthenticationController = require("../controllers/authentication-controller");
const BatchController = require("../controllers/batch-controller");
const MaterialController = require("../controllers/material-controller");
const PollController = require("../controllers/poll-controller");
const StudentController = require("../controllers/student-controller");
const StudentAnnouncementController = require("../controllers/student/student-announcement-controller");
const StudentBatchController = require("../controllers/student/student-batch-controller");
const StudentNotificationController = require("../controllers/student/student-notification-controller");
const StudentPollController = require("../controllers/student/student-poll-controller");
const SubjectController = require("../controllers/subject-controller");
const VideoController = require("../controllers/video-controller");
const AuthMiddleware = require("../middlewares/auth-middleware");
const LoginValidator = require("../validators/auth/login-validator");
const PasswordResetValidator = require("../validators/auth/password-reset-validator");
const RegisterValidator = require("../validators/auth/register-validator");
const VerifyOTPValidator = require("../validators/auth/verify-otp-validator");
const CreateBatchValidator = require("../validators/batch/create-batch-validator");
const CreateAnnouncementValidator = require("../validators/create-announcement-validator");
const CreateVideoValidator = require("../validators/create-video-validator");
const PollVoteValidator = require("../validators/poll-vote-validator");
const CreatePollValidator = require("../validators/poll/create-poll-validator");
const StudentAssignmentController = require("../controllers/student/student-assignment-controller");
const GoogleAuthController = require("../controllers/auth/google-auth-controller");
const ForgotPasswordController = require("../controllers/auth/forgot-password-controller");
const profileUpdateValidator = require("../validators/auth/profile-update-validator");
const UpdateVideoValidator = require("../validators/update-video-validator");
const CreateMaterialValidator = require("../validators/create-material-validator");
const UpdateMaterialValidator = require("../validators/update-material-validator");
const StudentTimelineController = require("../controllers/student/student-timeline");
const TeacherTimelineController = require("../controllers/student/teacher-timeline");

// Authentication Routes
router.get('/auth/google', GoogleAuthController.invoke);
router.post('/auth/reset-password', PasswordResetValidator.middleware, ForgotPasswordController.request);

router.post('/register', RegisterValidator.middleware, AuthenticationController.register);
router.post('/verify-otp', VerifyOTPValidator.middleware, AuthenticationController.verifyOTP);
router.post('/login', LoginValidator.middleware, AuthenticationController.login);

// Batches
router.get('/batch', AuthMiddleware, BatchController.index);
router.post('/batch', AuthMiddleware, CreateBatchValidator.middleware, BatchController.create);
router.get('/batch/:id', AuthMiddleware, BatchController.details);
router.post('/batch/:id', AuthMiddleware, CreateBatchValidator.middleware, BatchController.update);
router.delete('/batch/:id', AuthMiddleware, BatchController.delete);
router.get('/batch/:batchId/timeline', TeacherTimelineController.__invoke);


// Announcements
router.get('/announcement', AuthMiddleware, AnnouncementController.index);
router.get('/batch/:batchId/announcement', AuthMiddleware, AnnouncementController.listByBatch);
router.post('/announcement', AuthMiddleware, CreateAnnouncementValidator.middleware, AnnouncementController.create);
router.post('/announcement/:id/upload', AuthMiddleware, AnnouncementController.updateImage);
router.post('/announcement/:id/doc/upload', AuthMiddleware, AnnouncementController.updateFile);
router.post('/announcement/:id', AuthMiddleware, AnnouncementController.update);
router.delete('/announcement/:id', AuthMiddleware, AnnouncementController.delete);

// Polls
router.get('/poll', AuthMiddleware, PollController.index);
router.post('/poll', AuthMiddleware, CreatePollValidator.middleware, PollController.create);
router.delete('/poll/:id', AuthMiddleware, PollController.delete);

// Assignments
router.get('/batch/:batchId/assignment', AuthMiddleware, AssignmentController.listByBatch);
router.get('/batch/:batchId/assignment/:assignmentId', AuthMiddleware, AssignmentController.detailByBatch);
router.post('/batch/:batchId/assignment/import', AuthMiddleware, AssignmentController.import);
router.delete('/batch/:batchId/assignment/:assignmentId', AuthMiddleware, AssignmentController.delete);

// Videos
router.get('/batch/:batchId/video', AuthMiddleware, VideoController.index);
router.post('/video', AuthMiddleware, CreateVideoValidator.middleware, VideoController.create);
router.post('/video/:id/upload', AuthMiddleware, VideoController.updateVideo);
router.post('/video/:id', AuthMiddleware, UpdateVideoValidator.middleware, VideoController.update);
router.delete('/video/:id', AuthMiddleware, VideoController.delete);

// materials
router.get('/batch/:batchId/material', AuthMiddleware, MaterialController.index);
router.post('/material', AuthMiddleware, CreateMaterialValidator.middleware, MaterialController.create);
router.post('/material/:id/upload', AuthMiddleware, MaterialController.updateMaterial);
router.post('/material/:id', AuthMiddleware, UpdateMaterialValidator.middleware, MaterialController.update);
router.delete('/material/:id', AuthMiddleware, MaterialController.delete);

// Other
router.get('/get-all-student-list', AuthMiddleware, StudentController.list);
router.get('/profile', AuthMiddleware, AuthenticationController.profile);
router.post('/profile', AuthMiddleware, profileUpdateValidator.middleware, AuthenticationController.profileUpdate);
router.get('/subjects', AuthMiddleware, SubjectController.list);

// Student routes
router.use('/student', AuthMiddleware, (function () {
    const router = express.Router();

    router.get('/my-batches', StudentBatchController.index);
    router.get('/my-announcements', StudentAnnouncementController.index);
    router.get('/my-notifications', StudentNotificationController.index);
    router.get('/batch/:batchId/assignment', StudentAssignmentController.listByBatch);
    router.get('/batch/:batchId/assignment/:assignmentId', StudentAssignmentController.detailByBatch);
    router.get('/my-polls', StudentPollController.index);
    router.post('/poll/:id/vote', PollVoteValidator.middleware, StudentPollController.vote);
    router.get('/batch/:batchId/timeline', StudentTimelineController.__invoke);

    return router;
})());

router.get('/test', async (req, res) => { return res.json({}) });

module.exports = router;
