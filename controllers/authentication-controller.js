const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ResponseHelper = require('../helpers/response_helper');
const User = require("../models/user");
const UserLoginResource = require('../resources/user-login-resource');


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
            if (user) {
                return ResponseHelper.validationResponse(res, {
                    mobile: [
                        "Mobile number already registered!"
                    ]
                });
            }
        } else {
            // user registered using email
            user = await User.findOne({ email });
            if (user) {
                return ResponseHelper.validationResponse(res, {
                    mobile: [
                        "Email address already in use!"
                    ]
                });
            }
        }

        // user is not registered, create it
        user = await User.create({
            mobile,
            name,
            email,
            password: await bcrypt.hash(password, 10),
            otp: Math.floor(Math.random() * 9000) + 1000
        });

        // TODO: send otp via some mean

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
        if (user.isVerified) {
            return ResponseHelper.response403(res, null, "User already verified!");
        }

        // check if otp is correct
        if (user.otp === otp) {
            // otp correct set user as verified
            user.isVerified = true;
            user.otp = null;
            await user.save();
            return res.json({ message: "Account activated successfully!" });
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
        const { mobile, email, password } = req.body;

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

        let userResource = user.toObject();

        userResource.token = await jwt.sign(userResource, 'secretshouldntcomeout');

        return res.json({ user: new UserLoginResource(userResource) });


    }
};
