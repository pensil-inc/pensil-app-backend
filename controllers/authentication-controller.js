const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const SMS = require('../config/twilio');

const ResponseHelper = require('../helpers/response_helper');
const OTPMail = require('../mails/otp-mail');
const user = require('../models/user');
const User = require("../models/user");
const UserLoginResource = require('../resources/user-login-resource');
const UserResource = require('../resources/user-resource');


module.exports = class AuthenticationController {
    /**
     * Helping user register using either email or mobile
     * @param {*} req 
     * @param {*} res 
     */
    static async register(req, res) {
        const { name, mobile, email, password } = req.body;
        // if number is provided
        let user = null;
        if (mobile) {
            user = await User.findOne({ mobile });
            // if user not verified, remove the older user
            if (user) {
                if (!user.isVerified) {
                    await user.remove();
                } else {
                    return ResponseHelper.validationResponse(res, {
                        mobile: [
                            "Mobile number already registered!"
                        ]
                    });
                }
            }
        } else {
            // user registered using email
            user = await User.findOne({ email });
            // if user not verified, remove the older user
            if (user) {
                if (!user.isVerified) {
                    await user.remove();
                } else {
                    return ResponseHelper.validationResponse(res, {
                        mobile: [
                            "Email address already in use!"
                        ]
                    });
                }
            }
        }

        // user is not registered, create it
        user = await User.create({
            mobile,
            name,
            email,
            password: await bcrypt.hash(password, parseInt(process.env.APP_KEY)),
            role: "student",
            otp: Math.floor(Math.random() * 9000) + 1000
        });

        // TODO: send otp via some mean
        if (user.email) {
            (new OTPMail({
                to: user.email
            }, {
                otp: user.otp,
                user
            })).send()
        }

        if(user.mobile) {
            (new SMS("+91" + user.mobile, 'Hi, Your OTP for registration on pensil is ' + user.otp))
            .send();
        }

        // return response
        return res.json({ message: "User registered successfully!" });
    }

    /**
     * OTP Verification API
     * @param {*} req 
     * @param {*} res 
     */
    static async verifyOTP(req, res) {
        const { mobile, email, otp } = req.body;

        let user = null;

        if (mobile) {
            user = await User.findOne({ mobile });
        } else {
            user = await User.findOne({ email });
        }

        // check if user registered
        if (!user) {
            return ResponseHelper.validationResponse(res, {
                [mobile ? "mobile" : "email"]: [
                    "Not registered!"
                ]
            });
        }

        // check if user verified
        if (user.isVerified && user.otp === null) {
            return ResponseHelper.response403(res, null, "User already verified!");
        }

        // check if otp is correct
        if (user.otp === otp) {
            // otp correct set user as verified
            user.isVerified = true;
            user.otp = null;
            await user.save();

            let userResource = user.toObject();

            userResource.token = await jwt.sign(userResource, process.env.APP_KEY);

            return res.json({ user: new UserLoginResource(userResource) });
        } else {
            // otp is invalid
            return ResponseHelper.validationResponse(res, {
                otp: [
                    "OTP invalid!"
                ]
            });
        }
    }

    static async login(req, res) {
        const { mobile, email, password, fcmToken } = req.body;

        let user = null;

        if (mobile) {
            user = await User.findOne({ mobile });
        } else {
            user = await User.findOne({ email });
        }

        // check if user registered
        if (!user) {
            return ResponseHelper.validationResponse(res, {
                [mobile ? "mobile" : "email"]: [
                    "Not registered!"
                ]
            });
        }

        // check if user verified
        if (!user.isVerified) {
            return ResponseHelper.response403(res, null, "User not verified!");
        }

        // check if password incorrect
        if (!await bcrypt.compare(password, user.password)) {
            return ResponseHelper.validationResponse(res, {
                password: [
                    "Incorrect password!"
                ]
            });
        }

        user.lastLoginDate = moment();

        if (fcmToken) {
            user.fcmToken = fcmToken;
        }

        await user.save();

        let userResource = user.toObject();

        userResource.token = await jwt.sign(userResource, process.env.APP_KEY);

        return res.json({ user: new UserLoginResource(userResource) });


    }

    static async profile(req, res) {
        return res.json({ user: new UserResource(req.user) });
    }

    static async profileUpdate(req, res) {
        const values = req.body;

        // get user
        const user = req.user;

        // update values from request
        for(let value in values) {
            if (value === "password") {
                user[value] = await bcrypt.hash(values[value], parseInt(process.env.APP_KEY));
            } else {
                user[value] = values[value];
            }
        }

        // save user
        await user.save();

        // return user
        return res.json({ user: new UserResource(user) });
    }
};
