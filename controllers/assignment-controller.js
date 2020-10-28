const Assignment = require("../models/assignment");
const AssignmentResource = require("../resources/assignment-resource");
const Mongoose = require("mongoose");
const Batch = require("../models/batch");
const ResponseHelper = require("../helpers/response_helper");
const { Readable } = require('stream');
const AssignmentListResource = require("../resources/assignment-list-resource");

module.exports = class AssignmentController {
    // List all assignments by batch Id
    static async listByBatch(req, res) {
        const { batchId } = req.params;

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        const assignments = await Assignment.find({
            owner: req.user.id,
            batch: batch._id
        }).populate('batch');

        return res.json({ assignments: new AssignmentListResource(assignments) });
    }
    /**
     * List Assignments by me
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        const assignments = await Assignment.find({ owner: req.user.id });

        return res.json({ assignments: new AssignmentListResource(assignments) })
    }

    /**
     * Get details of any assignment
     * @param {*} req 
     * @param {*} res 
     */



    /**
     * Import from csv
     * @param {*} req 
     * @param {*} res 
     */
    static async import(req, res) {
        try {

            const { batchId } = req.params;

            const batch = await Batch.findById(batchId);

            if (!batch) {
                return ResponseHelper.validationResponse(res, {
                    batchId: ["Invalid Batch Id!"]
                })
            }

            const { sheet } = req.files;

            if (!sheet) {
                return ResponseHelper.validationResponse(res, {
                    sheet: [
                        "Sheet is required!"
                    ]
                });
            }

            // get file content
            const { data, mimetype, name, size } = sheet;

            if (mimetype !== "text/csv") {
                return ResponseHelper.validationResponse(res, {
                    sheet: [
                        "Only csv format is supported!"
                    ]
                });
            }

            let [extraInfo, headers, ...questions] = data.toString().split("\n");

            // parse extraInfo
            let [title, duration] = extraInfo.split(",");
            duration = parseInt(duration)

            // parse questions
            questions = questions.map(q => {
                const [statement, option1, option2, option3, option4, answer] = q.split(",");
                return {
                    statement: statement.trim(),
                    options: [
                        option1.trim(),
                        option2.trim(),
                        option3.trim(),
                        option4.trim()
                    ],
                    answer: answer.trim()
                };
            });

            // try to create assigment
            const assigment = await Assignment.create({
                title,
                duration,
                owner: req.user._id,
                batch: batch._id,
                questions,
                answers: []
            });

            // return response
            return res.json({ assigment });
        } catch (error) {
            console.error(error);
            return ResponseHelper.response500(res);
        }
    }

    // Delte assignment
    static async delete(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const assignment = await Assignment.findOne({
            _id: id,
            owner: req.user.id
        });

        if (!assignment) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        await assignment.remove();

        return res.json({
            message: "Assignment deleted!",
            assignment: new AssignmentResource(assignment)
        });

    }
};
