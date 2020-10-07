const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        question: String,
        options: [String],
        endTime: Date,
        owner: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        isForAll: Boolean,
        batches: [{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Batch',
        }],
        answers: [{
            student: mongoose.Types.ObjectId,
            option: String
        }]
    },
    {
        timestamps: true,
        toObject: {
            transform: (obj, ret) => {
                delete ret.password;
                delete ret.__v;
                ret.id = ret._id;
                delete ret.password;
                delete ret._id;
                return ret;
            }
        }
    }
);

const Poll = mongoose.model("poll", Schema);

module.exports = Poll;