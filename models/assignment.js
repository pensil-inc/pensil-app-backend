const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
        statement: String,
        options: [String],
        answer: String
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
        },
        toJSON: {
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

const Schema = new mongoose.Schema(
    {
        title: String,
        duration: Number,
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        batch: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Batch',
        },
        questions: [QuestionSchema],
        // Student submitted answers, wont save for now
        answers: [{
            student: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "User",
            },
            answers: [{
                question: mongoose.Types.ObjectId,
                option: String
            }],
            correct: Number,
            incorrect: Number,
            skipped: Number,
            timeTaken: Number
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
        },
        toJSON: {
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

const Assignment = mongoose.model("Assigment", Schema);

module.exports = Assignment;