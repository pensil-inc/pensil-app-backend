const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        description: String,
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
    },
    {
        timestamps: true,
        toObject: {
            transform: (obj, ret) => {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
                return ret;
            }
        },
        toJSON: {
            transform: (obj, ret) => {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
                return ret;
            }
        }
    }
);

const Announcement = mongoose.model("Announcement", Schema);

module.exports = Announcement;