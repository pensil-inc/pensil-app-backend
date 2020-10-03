const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: String,
        createdBy: {
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
        }
    }
);

module.exports = mongoose.model("Subject", Schema);