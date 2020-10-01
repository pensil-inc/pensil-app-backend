const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: String,
        subject: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        startTime: Date,
        endTime: Date,
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        updatedBy: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'User'
        }
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

module.exports = mongoose.model("Batch", Schema);