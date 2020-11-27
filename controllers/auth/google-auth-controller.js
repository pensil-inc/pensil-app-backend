const jwt = require('jsonwebtoken');

const firebaseAdmin = require("../../config/firebase");
const ResponseHelper = require("../../helpers/response_helper");
const User = require("../../models/user");
const UserLoginResource = require('../../resources/user-login-resource');

module.exports = class GoogleAuthController {
    static async invoke(req, res) {
        const { authorization } = req.headers;

        if (!authorization) {
            return ResponseHelper.response401(res);
        }

        const [bearer, token] = authorization.split(" ");

        if (!token) {
            return ResponseHelper.response401(res);
        }

        let result = null;

        try {
            // get user
            result = await firebaseAdmin.auth().getUser(token);
        } catch (error) {
            console.error({ error })
            return ResponseHelper.response401(res);
        }


        // create user if not exists
        let user = await User.findOne({ email: result.email });
        if (!user) {
            user = await User.create({
                name: result.displayName,
                email: result.email,
                password: "Google Login",
                role: "student"
            });
        }

        // generate token for user
        let userResource = user.toObject();
        userResource.token = await jwt.sign(userResource, process.env.APP_KEY);

        // return user
        return res.json({ user: new UserLoginResource(userResource) });
    }
};
