const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: String,
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        description: String,
        classes: [{
            dayOfWeek: Number,
            startTime: String,
            endTime: String,
        }],
        subject: {
            type: mongoose.Types.ObjectId,
            ref: "Subject",
            required: false
        },
        students: [{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
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

const Batch = mongoose.model("Batch", Schema);

module.exports = Batch;