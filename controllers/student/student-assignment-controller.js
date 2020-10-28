const ResponseHelper = require("../../helpers/response_helper");
const Batch = require("../../models/batch");
const Assignment = require("../../models/assignment");
const AssignmentListResource = require("../../resources/assignment-list-resource");
const AssignmentResource = require("../../resources/assignment-resource");

module.exports = class StudentAssignmentController {
    /**
     * Get list of assigment by batch
     * @param {*} req 
     * @param {*} res 
     */
    static async listByBatch(req, res) {
        const { batchId } = req.params;

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        // Check if batch does not have the student
        if (batch.students.findIndex(s => s == req.user._id.toString()) < 0) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            });
        }

        const assignments = await Assignment.find({
            batch: batch._id
        });

        return res.json({ assignments: new AssignmentListResource(assignments) });
    }
    /**
     * Get detail of assigment by batch
     * @param {*} req 
     * @param {*} res 
     */
    static async detailByBatch(req, res) {
        const { batchId, assignmentId } = req.params;

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        // Check if batch does not have the student
        if (batch.students.findIndex(s => s == req.user._id.toString()) < 0) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            });
        }

        const assignment = await Assignment.find({
            batch: batch._id,
            _id: assignmentId
        });

        return res.json({ assignment: new AssignmentResource(assignment) });
    }
};
