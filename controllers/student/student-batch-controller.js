const Batch = require("../../models/batch");
const BatchWithStudentResource = require("../../resources/batch-with-student-resource");

module.exports = class StudentBatchController {
    static async index(req, res) {
        // get all the batches where user is added
        const batches = await Batch.find({
            students: req.user.id
        }).populate('subject').populate('students');
        return res.json({ batches: new BatchWithStudentResource(batches)});
     }
};
