const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        mobile: {
            required: true,
            type: String,
            trim: true,
            validate: {
                validator: value => {
                    return /[0-9]{10}/.test(value);
                }
            }
        },
        email: {
            required: true,
            trim: true,
            type: String
        },
        password: {
            required: true,
            trim: true,
            type: String
        },
        isActive: {
            type: Boolean,
            required: false,
            default: true
        },
        isDeleted: {
            default: false,
            type: Boolean
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
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

module.exports = mongoose.model("User", Schema);