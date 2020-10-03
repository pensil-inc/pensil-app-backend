const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        title: String,
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
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

const Notification = mongoose.model("Notification", Schema);

module.exports = Notification;