const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        title: String,
        description: {
            required: false,
            type: String,
        },
        batch: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: "Batch"
        },
        subject: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: "Subject"
        },
        file: {
            required: false,
            type: String,
        },
        fileType: {
            required: false,
            type: String
        },
        fileUploadedOn: {
            required: false,
            type: String
        },
        isPrivate: {
            required: false,
            default: true,
            type: Boolean
        },
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

const Material = mongoose.model("Material", Schema);
module.exports = Material;