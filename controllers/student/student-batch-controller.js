const Batch = require("../../models/batch");

module.exports = class StudentBatchController {
    static async index(req, res) {
        // get all the batches where user is added
        const batches = await Batch.find({
            students: req.user.id
        });
        return res.json(batches);
     }
};
