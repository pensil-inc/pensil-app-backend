const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        mobile: {
            required: false,
            type: String,
            validate: {
                validator: value => {
                    return /[0-9]{10}/.test(value);
                }
            }
        },
        email: {
            required: false,
            trim: true,
            type: String
        },
        password: {
            required: true,
            trim: true,
            type: String
        },
        role: String,
        isVerified: {
            required: false,
            type: Boolean,
            default: false
        },
        otp: {
            required: false,
            type: Number
        },
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
        }
    }
);

module.exports = mongoose.model("User", Schema);