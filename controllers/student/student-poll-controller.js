const Mongoose = require("mongoose");
const moment = require("moment");

const Poll = require("../../models/poll");
const ResponseHelper = require("../../helpers/response_helper");
const PollResource = require("../../resources/poll-resource");

module.exports = class StudentPollController {
    static async vote(req, res) {

        const { answer } = req.body;

        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        let poll = await Poll.findOne({
            _id: id
        });

        // check if poll exists
        if (!poll) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // check if poll expired
        if (moment().isSameOrAfter(moment(poll.endTime))) {
            return res.status(403).json({
                message: "Poll expired!"
            });
        }
        // check if already answered
        if (poll.answers.findIndex(answer => answer.student.toString() === req.user.id.toString()) > -1) {
            return res.status(403).json({
                message: "Already voted!"
            });
        }

        // check if answer is not a valid option
        if (!poll.options.includes(answer)) {
            return ResponseHelper.validationResponse(res, {
                answer: [
                    "Not a valid answer!"
                ]
            });
        }

        // save the answer
        poll = await Poll.findOneAndUpdate({ _id: poll._id }, {
            $push: {
                answers: {
                    student: req.user.id,
                    option: answer
                }
            }
        }, { new: true })

        console.log({ poll })


        return res.json({
            message: "Voted successfully",
            poll: new PollResource(poll)
        });
    }
};
