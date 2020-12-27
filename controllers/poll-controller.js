const Poll = require("../models/poll");
const Mongoose = require("mongoose");
const PollNotification = require("../notifications/poll-notification");
const PollResource = require("../resources/poll-resource");
const Batch = require("../models/batch");
const moment = require('moment');

module.exports = class PollController {
    // List all polls by batch Id
    static async listByBatch(req, res) {
        const { batchId } = req.params;

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        const polls = await Poll.find({
            owner: req.user.id,
            batch: batch._id
        }).populate('answers.student')
            .populate('batch');

        return res.json({ polls: new PollResource(polls) });
    }
    /**
     * List Polls by me
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        const polls = await Poll.find({ owner: req.user.id }).populate('answers.student');

        return res.json({ polls: new PollResource(polls) })
    }

    /**
     * Create polls
     * @param {*} req 
     * @param {*} res 
     */
    static async create(req, res) {
        const { question, options, endTime, isForAll, batches } = req.body;

        // is poll is not for all
        if (!isForAll) {
            // check for invalid batches
            const invalidBatches = (await Promise.all(batches.map(async batch => {
                return Batch.findOne({
                    _id: batch,
                    owner: req.user.id
                });
            }))).map((batch, index) => {
                if (batch) {
                    return false;
                } else {
                    return batches[index] + " in not a valid batch!";
                }
            }).filter(e => e);

            if (invalidBatches.length > 0) {
                return ResponseHelper.validationResponse(res, {
                    batches: invalidBatches
                });
            }
        }

        const poll = await Poll.create({
            question,
            options,
            endTime,
            isForAll,
            batches: !isForAll ? batches : [],
            owner: req.user.id
        })

        // TODO: broadcast this poll (notify the users)
        if (isForAll) {
            PollNotification.toAll(poll);
        } else {
            PollNotification.toBatches(batches, poll);
        }

        return res.json({ poll: new PollResource(poll) })
    }

    static async end(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const poll = await Poll.findOne({
            _id: id,
            owner: req.user.id
        });

        if (!poll) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // update the end time to now
        poll.endTime = moment();
        poll.isExpired = true;

        await poll.save();

        return res.json({
            message: "Poll set to expired!",
            poll: new PollResource(poll)
        });

    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const poll = await Poll.findOne({
            _id: id,
            owner: req.user.id
        });

        if (!poll) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        await poll.remove();

        return res.json({
            message: "Poll deleted!",
            poll: new PollResource(poll)
        });

    }
};
