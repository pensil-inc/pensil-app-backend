const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class MainHelper {
    static async sendInvite(mobile) {
        const password = crypto.randomBytes(4).toString('hex');

        if (await User.exists({ mobile })) {
            return false;
        }
        const user = await User.create({
            name: "New User",
            mobile,
            role: "string",
            password: await bcrypt.hash(password, parseInt(process.env.APP_KEY))
        });

        // TODO: Send mail / OTP

        return user;
    }
}

module.exports = MainHelper;