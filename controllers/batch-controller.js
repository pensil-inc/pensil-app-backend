const moment = require("moment");
const Batch = require("../models/batch");

module.exports = class BatchController {
    /**
     * List all the batches
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        const batches = await Batch.find();
        console.log(req.user);
        return res.json({ batches });
    }

    /**
     * Create a new batch
     * @param {*} req 
     * @param {*} res 
     */
    static async create(req, res) {
        const batch = await Batch.create(req.body);
        return res.json({ batch });
    }

    static update(req, res) { }

    static delete(req, res) { }
};
