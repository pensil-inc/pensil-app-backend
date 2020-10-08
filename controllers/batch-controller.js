const moment = require("moment");
const mongoose = require("mongoose");
const MainHelper = require("../helpers/main_helper");
const ResponseHelper = require("../helpers/response_helper");
const Batch = require("../models/batch");
const Subject = require("../models/subject");
const User = require("../models/user");
const BatchWithStudentResource = require("../resources/batch-with-student-resource");

module.exports = class BatchController {
    /**
     * List all the batches
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        const batches = await Batch.find({ owner: req.user.id }).populate('students').populate('subject');

        return res.json({ batches: new BatchWithStudentResource(batches) });
    }

    /**
     * Create a new batch
     * @param {*} req 
     * @param {*} res 
     */
    static async create(req, res) {

        const {
            name,
            description,
            startTime,
            subject,
            endTime,
            students,
            classes
        } = req.body;

        // update/add subjects if needed
        let sub = await Subject.findOne({
            name: subject
        });

        if (!sub) {
            sub = await Subject.create({
                name: subject,
                createdBy: req.user.id
            });
        }

        // check for all the students (if they are in the db)
        await Promise.all(students.map(async (student, i) => {
            // find the student with mobile no
            let s = await User.findOne({
                mobile: student
            });
            // if not available, invite him/her
            if (!s) {
                s = await MainHelper.sendInviteToMobile(students[i])
            }

            students[i] = s._id;
        }));

        // check if class timings okay
        const invalidClasses = classes.map(timing => {
            const startTime = parseInt(timing.startTime.replace(/:/g, ""));
            const endTime = parseInt(timing.endTime.replace(/:/g, ""));
            if (startTime >= endTime || endTime > 2400) {
                return getDayOfWeek(timing.dayOfWeek) + " " + timing.startTime + "-" + timing.endTime + " is invalid timing!";
            } else {
                return false;
            }
        }).filter(e => e);

        // check if students missing
        if (invalidClasses.length > 0) {
            return ResponseHelper.validationResponse(res, {
                classes: invalidClasses
            });
        }

        // everything good, create the batch
        const batch = await Batch.create({
            name,
            description,
            subject: sub._id,
            owner: req.user._id,
            startTime,
            endTime,
            classes,
            students
        });

        return res.json({ batch });
    }

    static update(req, res) { }

    static delete(req, res) { }
};


function getDayOfWeek(dayOfWeek = 1) {
    switch (dayOfWeek) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 7:
            return "Sunday";
        default:
            return "Undefined";
    }
}