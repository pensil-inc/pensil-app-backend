const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class MainHelper {
    static async sendInviteToMobile(mobile, role = "student") {
        const password = crypto.randomBytes(4).toString('hex');

        if (await User.exists({ mobile })) {
            return false;
        }
        const user = await User.create({
            name: "New User",
            mobile,
            role,
            password: await bcrypt.hash(password, parseInt(process.env.APP_KEY))
        });

        // TODO: Send OTP

        return user;
    }
}

module.exports = MainHelper;