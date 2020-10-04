const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const SMS = require("../config/twilio");

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
            isVerified: true,
            password: await bcrypt.hash(password, parseInt(process.env.APP_KEY))
        });

        const sms = new SMS(
            "+91" + mobile,
            "Hi, you have been invited to the pensil Institute.\n Please use the following password along with your mobile number to login:\n" + password);

        sms.send();

        return user;
    }
}

module.exports = MainHelper;